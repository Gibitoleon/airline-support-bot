from abc import ABC, abstractmethod


class Reranker(ABC):
    @abstractmethod
    def rerank(self, query, retrieved_chunks, top_k):
        pass

    @abstractmethod
    def score_relevance(self, query, retrieved_chunks):
        pass
