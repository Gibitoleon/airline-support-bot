from .gemini import GeminiEmbeddingManager
from .sentence_transformer import SentenceTransformerEmbeddingManager


class EmbeddingFactory:
    _instances = {}

    @staticmethod
    def create_embedding_model(embedding_model_name: str):

        if embedding_model_name not in EmbeddingFactory._instances:
            if embedding_model_name == "all-MiniLM-L6-v2":
                EmbeddingFactory._instances[embedding_model_name] = (
                    SentenceTransformerEmbeddingManager("all-MiniLM-L6-v2")
                )

            elif embedding_model_name == "gemini":
                EmbeddingFactory._instances[embedding_model_name] = (
                    GeminiEmbeddingManager()
                )

            else:
                raise ValueError(f"Unknown embedding model: {embedding_model_name}")

        return EmbeddingFactory._instances[embedding_model_name]
