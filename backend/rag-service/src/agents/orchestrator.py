
from datetime import datetime
from zoneinfo import ZoneInfo

from tools.registry import build_tool_registry
from tools.tools_executor import execute_tool_call


class AgentOrchestrator:

    MAX_ITERATIONS = 5

    def __init__(self, llm, retrieval_service):
        self.llm = llm
        self.retrieval_service = retrieval_service

    
    def run(
        self,
        query: str,
        permissions: list[str],
        history: list[dict] | None = None
    ):

        # 1. Validate user input
        if not isinstance(query, str) or not query.strip():
            raise ValueError("A valid query is required.")

        if not isinstance(permissions, list):
            raise ValueError("Valid permissions are required.")

        if history is None:
            history = []

        if not isinstance(history, list):
            raise ValueError("Valid conversation history is required.")

        query = query.strip()

        print("\n" + "=" * 60)
        print("NEW AGENT REQUEST")
        print("User query:", query)
        print("=" * 60)

        # 2. Build request-specific tool registry
        registry = build_tool_registry(
            retrieval_service=self.retrieval_service,
            permissions=permissions
        )

        # 3. Extract tool definitions
        tools = [
            tool["definition"]
            for tool in registry.values()
        ]

        print("Available tools:", list(registry.keys()))

        # 4. Load system prompt
        system_prompt = self.llm.get_prompt(
            "agent_system_prompt"
        )

        # 5. Add current date
        current_date = datetime.now(
            ZoneInfo("Africa/Nairobi")
        ).date().isoformat()

        system_prompt += (
            f"\n\nToday's date is {current_date} "
            "in East Africa Time (EAT). "
            "Use this date when interpreting relative dates "
            "such as today and tomorrow."
        )

        # 6. Initialize conversation with system prompt
        messages = [
            {
                "role": "system",
                "content": system_prompt
            }
        ]

        # 7. Add previous conversation history
        for exchange in history[-5:]:

            if not isinstance(exchange, dict):
                continue

            question = exchange.get("question")
            response = exchange.get("response")

            if (
                isinstance(question, str)
                and question.strip()
                and isinstance(response, str)
                and response.strip()
            ):
                messages.append({
                    "role": "user",
                    "content": question
                })

                messages.append({
                    "role": "assistant",
                    "content": response
                })

        # 8. Append current user query
        messages.append({
            "role": "user",
            "content": query
        })

        print("Previous exchanges loaded:", len(history[-5:]))

        total_tool_calls = 0

        # 9. Agent execution loop
        for iteration in range(self.MAX_ITERATIONS):

            print(f"\n{'-' * 20} ITERATION {iteration + 1} {'-' * 20}")

            response = self.llm.chat_with_tools(
                messages=messages,
                tools=tools,
                tool_choice="auto",
                temperature=0.1,
                max_tokens=1024
            )

            assistant_message = response.choices[0].message

            print("Finish reason:", response.choices[0].finish_reason)
            print("Assistant content:", assistant_message.content)

            # 10. Check whether the model requested tools
            if not assistant_message.tool_calls:

                final_response = assistant_message.content

                print("\nAGENT FINISHED")
                print("Total iterations:", iteration + 1)
                print("Total tool calls:", total_tool_calls)
                print("=" * 60)

                if not final_response:
                    return (
                        "I'm sorry, I couldn't generate a response. "
                        "Please try again."
                    )

                return final_response.strip()

            # 11. Preserve assistant tool-call message
            messages.append(
                assistant_message.model_dump(
                    exclude_none=True
                )
            )

            # 12. Execute requested tools
            for tool_call in assistant_message.tool_calls:

                total_tool_calls += 1

                tool_name = tool_call.function.name

                print("\nTOOL CALL:", total_tool_calls)
                print("Tool name:", tool_name)
                print("Tool arguments:", tool_call.function.arguments)

                tool_result = execute_tool_call(
                    tool_call=tool_call,
                    registry=registry
                )

                print("Tool result:", tool_result["content"])

                # 13. Append tool result
                messages.append(tool_result)

        # 14. Execution limit reached
        print("\nAGENT EXECUTION LIMIT REACHED")
        print("Maximum iterations:", self.MAX_ITERATIONS)
        print("Total tool calls:", total_tool_calls)
        print("=" * 60)

        return (
            "I'm sorry, I couldn't complete your request "
            "within the available processing steps. "
            "Please try again."
        )
