# src/jobs/document_jobs.py

from rag.ingestion import IngestionManager
from rag.embedding_models.embedding_factory import EmbeddingFactory
from rag.vector_store.chroma_store import ChromaVectorStore
from rag.llms.llama import LlamaManager


embedding_manager = EmbeddingFactory.create_embedding_model("gemini")

vector_store = ChromaVectorStore(collection_name="kenya_airways_gemini")

llm = LlamaManager()


def ingest_document(file_path):

    print(f"[INGESTION] Processing document: {file_path}")

    print("[INGESTION] Loading document and creating chunks...")

    result = IngestionManager.ingest(
        file_path=file_path,
        embedding_manager=embedding_manager,
        vector_store=vector_store,
        llm=llm,
    )

    print("[INGESTION] Document ingestion completed successfully.")

    return result
