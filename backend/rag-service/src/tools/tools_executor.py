
import json


def execute_tool_call(tool_call, registry):
    """
    Execute a tool requested by the LLM using the local tool registry.

    Args:
        tool_call: A tool call returned by Groq.
        registry: The application's tool registry.

    Returns:
        A tool message containing the execution result.
    """

    # 1. Extract the requested tool name
    tool_name = tool_call.function.name

    # 2. Find the tool in our registry
    tool_entry = registry.get(tool_name)

    if tool_entry is None:
        result = {
            "success": False,
            "error": f"Unknown tool: {tool_name}"
        }

    else:
        try:
            # 3. Parse Groq's JSON arguments into a Python dictionary
            arguments = json.loads(
                tool_call.function.arguments
            )

            if not isinstance(arguments, dict):
                raise ValueError("Tool arguments must be a JSON object.")

            # 4. Retrieve the actual Python function
            tool_function = tool_entry["execute"]

            # 5. Execute the function with Groq's arguments
            result = tool_function(**arguments)

        except (json.JSONDecodeError, TypeError, ValueError) as exc:
            result = {
                "success": False,
                "error": str(exc)
            }

        except Exception:
            # Log the actual exception on the server in production.
            result = {
                "success": False,
                "error": "The requested tool could not be executed."
            }

    # 6. Return the result in Groq's expected tool-message format
    return {
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": json.dumps(result, ensure_ascii=False)
    }
