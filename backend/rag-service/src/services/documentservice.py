from pathlib import Path
import re

import pymupdf
import pymupdf4llm


class DocumentService:
    ALLOWED_MIME_TYPES = {"application/pdf": "pdf", "text/plain": "txt"}

    @staticmethod
    def upload_document(file, document_metadata):
        """
        Extract document content, add YAML metadata,
        and save the normalized document as Markdown.
        """

        if not file:
            raise ValueError("Document file is required")

        original_filename = file.filename

        if not original_filename:
            raise ValueError("Document filename is required")

        mime_type = file.mimetype

        if mime_type not in DocumentService.ALLOWED_MIME_TYPES:
            raise ValueError(f"Unsupported file type: {mime_type}")

        file_type = DocumentService.ALLOWED_MIME_TYPES[mime_type]

        content = DocumentService._extract_content(file, file_type)

        front_matter = DocumentService._build_front_matter(document_metadata)

        final_content = front_matter + content

        document_id = document_metadata["document_id"]

        domain = document_metadata["domain"].lower()

        title = document_metadata["title"]

        raw_directory = Path(__file__).resolve().parents[2] / "data" / "raw"

        domain_directory = raw_directory / domain

        domain_directory.mkdir(parents=True, exist_ok=True)

        sanitized_title = DocumentService._sanitize_title(title)

        output_filename = f"{document_id}-{sanitized_title}.md"

        output_path = domain_directory / output_filename

        output_path.write_text(final_content, encoding="utf-8")

        return {
            "file_name": output_filename,
            "file_path": str(output_path),
            "original_file_name": original_filename,
        }

    @staticmethod
    def _extract_content(file, file_type):

        if file_type == "pdf":
            return DocumentService._extract_pdf(file)

        if file_type == "txt":
            return DocumentService._extract_txt(file)

        raise ValueError(f"Unsupported file type: {file_type}")

    @staticmethod
    def _extract_pdf(file):

        print("FILE TYPE:", type(file))
        print("FILE:", file)

        file_bytes = file.read()

        print("BYTES TYPE:", type(file_bytes))

        print("BYTES LENGTH:", len(file_bytes))

        document = pymupdf.open(stream=file_bytes, filetype="pdf")

        print("DOCUMENT TYPE:", type(document))

        markdown = pymupdf4llm.to_markdown(document)

        document.close()

        return markdown

    @staticmethod
    def _extract_txt(file):

        return file.read().decode("utf-8")

    @staticmethod
    def _sanitize_title(title):

        filename = title.lower()

        filename = re.sub(r"[^a-z0-9]+", "-", filename)

        return filename.strip("-")

    @staticmethod
    def _build_front_matter(metadata):

        applicable_to = "\n".join(f"  - {value}" for value in metadata["applicable_to"])

        return f"""---
document_id: {metadata["document_id"]}
title: {metadata["title"]}
origin: {metadata["origin"]}
domain: {metadata["domain"]}
category: {metadata["category"]}
document_type: {metadata["document_type"]}
applicable_to:
{applicable_to}
access: {metadata["access"]}
status: {metadata["status"]}
language: {metadata["language"]}
---

"""

    @staticmethod
    def _get_document_content(domain, filename):

        raw_directory = Path(__file__).resolve().parents[2] / "data" / "raw"

        domain_directory = raw_directory / domain.lower()

        file_path = domain_directory / filename

        if not file_path.exists():
            raise FileNotFoundError(f"Document not found: {file_path}")

        return file_path.read_text(encoding="utf-8")

    @staticmethod
    def _delete_document(domain, filename):
        raw_directory = Path(__file__).resolve().parents[2] / "data" / "raw"

        domain_directory = raw_directory / domain.lower()

        file_path = domain_directory / filename

        if not file_path.exists():
            raise FileNotFoundError(f"Document not found: {file_path}")

        file_path.unlink()
