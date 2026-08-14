from sentence_transformers import SentenceTransformer

from .interface import EmbeddingManager

# class implementation converting  the chunks into embeddings using sentence-transformers


class SentenceTransformerEmbeddingManager(EmbeddingManager):
    def __init__(self, model_name):
        self.model_name = model_name
        self.embedding_model = None
        self.load_embeddingmodel()

    def load_embeddingmodel(self):

        self.embedding_model = SentenceTransformer(self.model_name)

    def create_embeddings(self, chunks):
        if self.embedding_model is None:
            raise ValueError(
                "Embedding model not loaded. Call load_embeddingmodel() first."
            )

        texts = [chunk.page_content for chunk in chunks]
        return self.embedding_model.encode(texts)

    def create_query_embedding(self, query):
        if self.embedding_model is None:
            raise ValueError(
                "Embedding model not loaded. Call load_embeddingmodel() first."
            )

        return self.embedding_model.encode(query)
