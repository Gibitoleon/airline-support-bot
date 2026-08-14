from abc import ABC, abstractmethod


class Reranker(ABC):
    @abstractmethod
    def rerank(self, query, retrieved_chunks, top_k):
        pass
