import json

from flask import Flask, jsonify, request
from jobs.document_jobs import ingest_document
from jobs.document_jobs import delete_document_vectors
from queues.deletion_queue import deletion_queue
from queues.ingestion_queue import ingestion_queue
from rag.embedding_models.embedding_factory import EmbeddingFactory
from rag.llms.llama import LlamaManager
from rag.rerankers.cross_encoder import MiniLMReranker
from rag.retrieval import RetrievalService
from rag.vector_store.chroma_store import ChromaVectorStore
from services.documentservice import DocumentService

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
                "message": ("Sorry, you do not have access to this information."),
            }
        ), 403

    response = llm.generate_response(query=query, context=result["content"])

    return jsonify({"status": "SUCCESS", "query": query, "response": response}), 200


@app.route("/documents", methods=["POST"])
def upload_document():

    file = request.files.get("file")

    applicable_to = request.form.get("applicable_to")

    document_metadata = {
        "document_id": request.form.get("document_id"),
        "title": request.form.get("title"),
        "origin": request.form.get("origin"),
        "domain": request.form.get("domain"),
        "category": request.form.get("category"),
        "document_type": request.form.get("document_type"),
        "applicable_to": json.loads(applicable_to),
        "access": request.form.get("access"),
        "status": request.form.get("status"),
        "language": request.form.get("language"),
    }

    result = DocumentService.upload_document(file, document_metadata)
    ingestion_queue.enqueue(ingest_document, file_path=result["file_path"])

    return jsonify(result), 201


@app.route("/documents/<documentId>/content", methods=["POST"])
def get_document_content(documentId):

    data = request.get_json()

    domain = data.get("domain")
    filename = data.get("filename")

    try:
        content = DocumentService._get_document_content(domain, filename)
    except FileNotFoundError:
        return jsonify({"status": "NOT_FOUND", "message": "Document not found"}), 404

    return jsonify({"status": "SUCCESS", "content": content}), 200


@app.route("/documents/<documentId>", methods=["DELETE"])
def delete_document(documentId):
    data = request.get_json()
    domain = data.get("domain")
    filename = data.get("filename")
    try:
        DocumentService._delete_document(domain, filename)
        # Enqueue the deletion of document vectors
        deletion_queue.enqueue(delete_document_vectors, document_id=documentId)
    except FileNotFoundError:
        return jsonify({"status": "NOT_FOUND", "message": "Document not found"}), 404

    return jsonify(
        {"status": "SUCCESS", "message": "Document deleted successfully"}
    ), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
