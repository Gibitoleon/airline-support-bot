from flask import Flask, request, jsonify
from rag.embedding_models.embedding_factory import EmbeddingFactory
from rag.rerankers.cross_encoder import MiniLMReranker
from rag.vector_store.chroma_store import ChromaVectorStore
from rag.retrieval import RetrievalService
from rag.llms.llama import LlamaManager

app = Flask(__name__)

embedding_model = EmbeddingFactory.create_embedding_model("gemini")
reranker = MiniLMReranker()
vector_store = ChromaVectorStore(collection_name="kenya_airways_gemini")
llm = LlamaManager()
retrievalService = RetrievalService(
    embedding_manager=embedding_model, vector_store=vector_store, reranker=reranker
)


@app.route("/retrieve", methods=["POST"])
def retrieve():
    data = request.get_json()

    query = data.get("query")
    permissions = data.get("permissions")

    print(f"query: {query}")
    print(f"permissions: {permissions}")

    result = retrievalService.retrieve(query=query, permissions=permissions)

    if result["status"] == "ACCESS_DENIED":
        return jsonify(
            {
                "status": "ACCESS_DENIED",
                "message": "Sorry, you do not have access to this information.",
            }
        ), 403

    response = llm.generate_response(query=query, context=result["content"])

    return jsonify({"status": "SUCCESS", "query": query, "response": response}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
