from .embedding_factory import EmbeddingFactory


embedding_manager = EmbeddingFactory.create_embedding_model("gemini")

##embedding_manager = EmbeddingFactory.create_embedding_model("all-MiniLM-L6-v2")
