import numpy as np
from ..embedding_models.embedding_factory import EmbeddingFactory
from ..rerankers.instance import reranker


class SemanticRelevanceEvaluator:
    def __init__(self, threshold=0.70):
        self.reranker = reranker
        self.threshold = threshold

    def evaluate(self, query, retrieved_chunks):

        retrieved_chunks = self.reranker.score_relevance(query, retrieved_chunks)

        for chunk in retrieved_chunks:
            chunk["is_relevant"] = chunk["relevance_score"] >= self.threshold

        return retrieved_chunks
