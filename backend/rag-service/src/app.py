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
    print(f"{query}")
    topResult = retrievalService.retrieve(query)
    print("topResult:", topResult)
    print("type:", type(topResult))
    content = topResult.get("content")
    response = llm.generate_response(query=query, context=content)

    return jsonify({"query": query, "response": response})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
