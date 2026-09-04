from openai import OpenAI
from .interface import LLMManager


class LlamaManager(LLMManager):
    def __init__(self):
        self.client = self.load_llm()

    def load_llm(self):
        return OpenAI(base_url="http://localhost:8080/v1", api_key="sk-no-key-required")

    def generate_response(self, query: str, context: str) -> str:

        prompt = f"""
Context:
{context}

Question:
{query}
"""

        response = self.client.chat.completions.create(
            model="Llama-3.2-3B-Instruct",
            messages=[
                {
                    "role": "system",
                    "content": """
                    You are a customer and staff support assistant for Kenya Airways.

                    Your purpose is to provide clear and helpful answers to customer
                    and staff questions using the information provided in the context.

                    Use only the provided context when answering.
                    Do not invent or assume information.

                    Never refer to information as "the TARGET CHUNK", "the context",
                    or "the retrieved information".

                    If the context does not contain enough information to answer the
                    question, clearly state that the information is not available.

                    Respond directly to the user's question in a professional and
                    concise manner.
                    """,
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.1,
            max_tokens=512,
        )

        return response.choices[0].message.content
