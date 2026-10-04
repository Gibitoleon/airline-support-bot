import yaml

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import (
    MarkdownHeaderTextSplitter,
    RecursiveCharacterTextSplitter,
)

from rag.chunking_strategy.contextual_chunking.contextual_chunking import Contextualizer


class IngestionManager:
    @staticmethod
    def ingest(file_path, embedding_manager, vector_store, llm):

        print(f"[INGESTION] Loading document: {file_path}")

        documents = IngestionManager._load_document(file_path)

        print("[INGESTION] Adding metadata...")

        IngestionManager._add_metadata(documents)

        print("[INGESTION] Creating chunks...")
        chunks = IngestionManager._create_chunks(documents)

        print(f"[INGESTION] Created {len(chunks)} chunks.")

        print("[INGESTION] Contextualizing chunks...")
        contextualizer = Contextualizer(llm)

        IngestionManager._contextualize_chunks(chunks, contextualizer)

        print("[INGESTION] Creating embeddings...")
        embeddings = embedding_manager.create_embeddings(chunks)

        print("[INGESTION] Storing chunks in vector database...")

        vector_store.add_chunks(chunks, embeddings)

        print("[INGESTION] Document ingestion completed successfully.")

        print(
            f"[INGESTION] Ingested {len(documents)} documents and {len(chunks)} chunks."
        )

        return {"documents": len(documents), "chunks": len(chunks)}

    @staticmethod
    def _load_document(file_path):

        loader = TextLoader(file_path)

        return loader.load()

    @staticmethod
    def _add_metadata(documents):

        for document in documents:
            content = document.page_content

            if not content.startswith("---"):
                continue

            _, front_matter, markdown = content.split("---", 2)

            metadata = yaml.safe_load(front_matter)

            document.metadata.update(metadata)

            document.page_content = markdown

    @staticmethod
    def _create_chunks(documents):

        markdown_splitter = MarkdownHeaderTextSplitter(
            headers_to_split_on=[
                ("#", "section"),
                ("##", "subsection"),
                ("###", "subsubsection"),
            ]
        )

        recursive_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200
        )

        chunks = []

        for document in documents:
            sections = markdown_splitter.split_text(document.page_content)

            for section in sections:
                section.metadata.update(document.metadata)

                smaller_chunks = recursive_splitter.split_documents([section])

                for chunk in smaller_chunks:
                    document_id = document.metadata.get("document_id", "UNKNOWN")

                    chunk.metadata["chunk_id"] = (
                        f"{document_id}-chunk-{len(chunks) + 1:03d}"
                    )

                    chunks.append(chunk)

        return chunks

    @staticmethod
    def _contextualize_chunks(chunks, contextualizer):

        for i, chunk in enumerate(chunks):
            document_id = chunk.metadata.get("document_id")

            previous_chunk = None

            if i > 0:
                candidate = chunks[i - 1]

                if candidate.metadata.get("document_id") == document_id:
                    previous_chunk = candidate

            next_chunk = None

            if i < len(chunks) - 1:
                candidate = chunks[i + 1]

                if candidate.metadata.get("document_id") == document_id:
                    next_chunk = candidate

            contextualizer.enrich_chunk(chunk, previous_chunk, next_chunk)

        return chunks
