def calculate_precision(relevance_labels: list[bool]) -> float:
    """
    Precision@K:
    Proportion of retrieved chunks that were judged relevant.
    """
    if not relevance_labels:
        return 0.0

    relevant_count = sum(relevance_labels)

    return relevant_count / len(relevance_labels)


def calculate_hit_at_k(relevance_labels: list[bool]) -> int:
    """
    Hit@K:
    1 if at least one relevant chunk was retrieved, otherwise 0.
    """
    return 1 if any(relevance_labels) else 0


def calculate_mrr(relevance_labels: list[bool]) -> float:
    """
    Mean Reciprocal Rank for one question:
    Reciprocal rank of the first relevant retrieved chunk.
    """
    for rank, is_relevant in enumerate(relevance_labels, start=1):
        if is_relevant:
            return 1 / rank

    return 0.0
