class RetrievalService:
    def __init__(self, embedding_manager, vector_store, reranker):
        self.embedding_manager = embedding_manager
        self.vector_store = vector_store
        self.reranker = reranker

    def retrieve(self, query, permissions, top_k=5):
        """
        Main retrieval pipeline.

        1. Create query embedding
        2. Retrieve candidate chunks
        3. Build chunk objects
        4. Rerank candidate chunks
        5. Get the top-ranked chunk
        6. Check whether the top chunk is authorized
        7. Return the top chunk if authorized
        """

        query_embedding = self._create_query_embedding(query)

        results = self._retrieve_from_vector_store(query_embedding, top_k)

        chunks = self._build_chunks(results)

        reranked_chunks = self._rerank_chunks(query, chunks)

        top_chunk = self._get_top_chunk(reranked_chunks)

        if not self._is_authorized(top_chunk, permissions):
            return {"status": "ACCESS_DENIED", "content": None}

        return {"status": "SUCCESS", "content": top_chunk["content"]}

    def _create_query_embedding(self, query):
        return self.embedding_manager.create_query_embedding(query)

    def _retrieve_from_vector_store(self, query_embedding, top_k):
        return self.vector_store.retrieve(query_embedding, top_k)

    def _build_chunks(self, results):
        chunks = []

        documents = results["documents"][0]
        ids = results["ids"][0]
        metadatas = results["metadatas"][0]
        distances = results["distances"][0]

        for i, (document, chunk_id, metadata, distance) in enumerate(
            zip(documents, ids, metadatas, distances)
        ):
            chunk = {
                "rank": i + 1,
                "chunk_id": chunk_id,
                "section": metadata.get("section"),
                "applicable_to": metadata.get("applicable_to", []),
                "distance": distance,
                "content": document,
            }

            chunks.append(chunk)

        return chunks

    def _rerank_chunks(self, query, chunks):
        return self.reranker.rerank(query, chunks)

    def _get_top_chunk(self, chunks):
        return next(chunk for chunk in chunks if chunk["reranked_rank"] == 1)

    def _is_authorized(self, chunk, permissions):
        permission_to_audience = {
            "VIEW_CUSTOMER_DOCUMENTS": "CUSTOMER",
            "VIEW_CUSTOMER_SERVICE_DOCUMENTS": "CUSTOMER_SERVICE_AGENT",
            "VIEW_HR_DOCUMENTS": "HR",
        }

        allowed_audiences = {
            permission_to_audience[permission]
            for permission in permissions
            if permission in permission_to_audience
        }

        applicable_to = chunk.get("applicable_to", [])

        return bool(set(applicable_to).intersection(allowed_audiences))
