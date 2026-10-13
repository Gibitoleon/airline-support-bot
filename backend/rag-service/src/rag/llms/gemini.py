import os
from openai import OpenAI
from pathlib import Path
from dotenv import load_dotenv
from .interface import LLMManager
from .prompts.prompts import Prompts

PROJECT_ROOT = Path(__file__).resolve().parents[4]
ENV_FILE = PROJECT_ROOT / ".env"

load_dotenv(ENV_FILE)

load_dotenv()
class GeminiManager(LLMManager):
    MODEL = "gemini-3.8-flash"

    def __init__(self):
        self.client = self.load_llm()

    def load_llm(self):
        return OpenAI(
            api_key=os.getenv("GEMINI_API_KEY"),
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
        )

    def get_prompt(self, name: str) -> str:
        prompt = next(prompt for prompt in Prompts if prompt["name"] == name)
        return prompt["template"]

    def _generate(
        self,
        prompt: str,
        temperature: float = 0.1,
        max_tokens: int = 512,
        reasoning_effort: str | None = None,
    ) -> str:
        extra = {}
        if reasoning_effort:
            extra["reasoning_effort"] = reasoning_effort

        response = self.client.chat.completions.create(
            model=self.MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
            **extra,
        )

        content = response.choices[0].message.content
        return content if content is not None else ""

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
        return self._generate(
            prompt,
            temperature=0.0,
            max_tokens=50,
            reasoning_effort="low",
        ).strip()