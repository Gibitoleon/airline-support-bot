from abc import ABC, abstractmethod


class EmbeddingManager(ABC):
    @abstractmethod
    def load_embeddingmodel(self):
        pass

    @abstractmethod
    def create_embeddings(self, chunks):
        pass

    @abstractmethod
    def create_query_embedding(self, query):
        pass
