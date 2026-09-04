from sentence_transformers import CrossEncoder

from .interface import Reranker


class MiniLMReranker(Reranker):
    def __init__(self, model_name="cross-encoder/ms-marco-MiniLM-L6-v2"):
        self.model_name = model_name

        self.reranker = CrossEncoder(model_name)

    def rerank(self, query, retrieved_chunks, top_k=5):

        # Query-document pairs
        pairs = [[query, chunk["content"]] for chunk in retrieved_chunks]

        # Calculate relevance scores
        scores = self.reranker.predict(pairs)

        # Attach score to original chunk
        for chunk, score in zip(retrieved_chunks, scores):
            chunk["rerank_score"] = float(score)

        # Highest score = most relevant
        reranked_chunks = sorted(
            retrieved_chunks, key=lambda chunk: chunk["rerank_score"], reverse=True
        )

        # Give them their new ranking
        for rank, chunk in enumerate(reranked_chunks, start=1):
            chunk["reranked_rank"] = rank

        return reranked_chunks[:top_k]

    def score_relevance(self, query, retrieved_chunks):

        pairs = [[query, chunk["content"]] for chunk in retrieved_chunks]

        scores = self.reranker.predict(pairs)

        for chunk, score in zip(retrieved_chunks, scores):
            chunk["relevance_score"] = float(score)

        return retrieved_chunks
