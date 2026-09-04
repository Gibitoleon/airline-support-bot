from abc import (
    ABC,
    abstractmethod,
)


class LLMManager(ABC):
    @abstractmethod
    def load_llm(self):
        pass

    @abstractmethod
    def generate_response(self, query: str, context: str) -> str:
        pass
