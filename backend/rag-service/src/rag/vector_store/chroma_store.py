import chromadb


## class blueprint for the ChromaVectorStore class that will be used to store the embeddings in a
# vector store
class ChromaVectorStore:
    def __init__(
        self, collection_name, persist_directory="../data/processed/vector_store"
    ):
        self.client = chromadb.PersistentClient(path=persist_directory)

        self.collection = self.client.get_or_create_collection(name=collection_name)

    def add_chunks(self, chunks, embeddings):
        documents = [chunk.page_content for chunk in chunks]

        metadatas = [chunk.metadata for chunk in chunks]

        ids = [chunk.metadata["chunk_id"] for chunk in chunks]

        self.collection.add(
            ids=ids, documents=documents, embeddings=embeddings, metadatas=metadatas
        )

    def retrieve(self, query_embedding, top_k=5):
        results = self.collection.query(
            query_embeddings=[query_embedding], n_results=top_k
        )

        return results
