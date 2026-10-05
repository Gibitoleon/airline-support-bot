from abc import (
    ABC,
    abstractmethod,
)


class LLMManager(ABC):
    @abstractmethod
    def load_llm(self):
        pass

    @abstractmethod
    def generate_context(
        self, title: str, section: str, previous: str, chunk: str, next: str
    ) -> str:
        pass

    @abstractmethod
    def route_query(self, query: str) -> str:
        pass

    @abstractmethod
    def generate_response(self, query: str, context: str) -> str:
        pass
