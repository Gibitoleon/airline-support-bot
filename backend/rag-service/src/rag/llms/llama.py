from openai import OpenAI
from .interface import LLMManager
from .prompts.prompts import Prompts


class LlamaManager(LLMManager):
    MODEL = "hugging-quants/Llama-3.2-3B-Instruct-Q4_K_M-GGUF:Q4_K_M"

    def __init__(self):
        self.client = self.load_llm()

    def load_llm(self):
        return OpenAI(
            base_url="http://localhost:8080/v1",
            api_key="sk-no-key-required",
        )

    def get_prompt(self, name: str) -> str:
        prompt = next(prompt for prompt in Prompts if prompt["name"] == name)
        return prompt["template"]

    def _generate(
        self,
        prompt: str,
        temperature: float = 0.1,
        max_tokens: int = 512,
    ) -> str:
        """Shared call — all three methods route through this."""
        response = self.client.chat.completions.create(
            model=self.MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return response.choices[0].message.content

    def generate_response(
        self, query: str, context: str = "", prompt_name: str = "response_prompt"
    ) -> str:
        template = self.get_prompt(prompt_name)
        prompt = template.format(query=query, context=context)
        return self._generate(prompt, temperature=0.1, max_tokens=512)

    def generate_context(
        self, title: str, section: str, previous: str, chunk: str, next: str
    ) -> str:
        template = self.get_prompt("contextualizer_prompt")
        prompt = template.format(
            title=title,
            section=section,
            previous=previous,
            chunk=chunk,
            next=next,
        )
        return self._generate(prompt, temperature=0.1, max_tokens=256)

    def route_query(self, query: str) -> str:
        template = self.get_prompt("route_prompt")
        prompt = template.format(query=query)
        return self._generate(prompt, temperature=0.0, max_tokens=20).strip()