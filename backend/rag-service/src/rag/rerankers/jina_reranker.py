import os
import requests

from .interface import Reranker


class JinaReranker(Reranker):

    def __init__(
        self,
        model_name="jina-reranker-v2-base-multilingual"
    ):
        self.model_name = model_name
        self.api_key = os.getenv("JINA_API_KEY")
        self.api_url = "https://api.jina.ai/v1/rerank"

        if not self.api_key:
            raise ValueError("JINA_API_KEY is not configured")

    def _get_scores(self, query, retrieved_chunks):

        if not retrieved_chunks:
            return []

        documents = [
            chunk["content"] for chunk in retrieved_chunks
        ]

        response = requests.post(
            self.api_url,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": self.model_name,
                "query": query,
                "documents": documents,
                "top_n": len(documents),
                "return_documents": False
            },
            timeout=30
        )

        response.raise_for_status()

        results = response.json()["results"]

        # Map API scores back to original chunks using their indices
        scores = [None] * len(retrieved_chunks)

        for result in results:
            scores[result["index"]] = float(
                result["relevance_score"]
            )

        return scores

    def rerank(self, query, retrieved_chunks, top_k=5):

        scores = self._get_scores(query, retrieved_chunks)

        for chunk, score in zip(retrieved_chunks, scores):
            chunk["rerank_score"] = score

        reranked_chunks = sorted(
            retrieved_chunks,
            key=lambda chunk: chunk["rerank_score"],
            reverse=True
        )

        for rank, chunk in enumerate(reranked_chunks, start=1):
            chunk["reranked_rank"] = rank

        return reranked_chunks[:top_k]

    def score_relevance(self, query, retrieved_chunks):

        scores = self._get_scores(query, retrieved_chunks)

        for chunk, score in zip(retrieved_chunks, scores):
            chunk["relevance_score"] = score

        return retrieved_chunks