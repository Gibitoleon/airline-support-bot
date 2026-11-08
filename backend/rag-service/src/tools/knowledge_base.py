
from typing import Any

from rag.retrieval import RetrievalService


def knowledge_base_search(
    query: str,
    permissions: list[str],
    retrieval_service: RetrievalService
) -> dict[str, Any]:
    """
    Search the Kenya Airways knowledge base for relevant information.

    Args:
        query: Customer's question or search query.
        permissions: Access permissions supplied by the trusted backend.
        retrieval_service: Existing RAG retrieval service instance.

    Returns:
        A dictionary containing the retrieval result and its status.
    """

    # 1. Validate inputs
    if not isinstance(query, str) or not query.strip():
        raise ValueError("A valid search query is required.")

    if not isinstance(permissions, list):
        raise ValueError("Permissions must be provided as a list.")

    # 2. Retrieve relevant knowledge
    result = retrieval_service.retrieve(
        query=query.strip(),
        permissions=permissions
    )

    # 3. Handle access restrictions
    if result["status"] == "ACCESS_DENIED":
        return {
            "status": "ACCESS_DENIED",
            "content": None
        }

    # 4. Return retrieved information
    return {
        "status": "SUCCESS",
        "content": result["content"]
    }
