FROM python:3.12-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --timeout=120 --retries=10 -r requirements.txt

# Copy application code and raw documents
COPY src/ ./src/
COPY data/raw/ ./data/raw/

# ChromaDB persistence location
ENV CHROMA_PERSIST_DIRECTORY=/app/data/processed/vector_store

# Flask API port
EXPOSE 5001

# Start the RAG service
WORKDIR /app/src
CMD ["python", "app.py"]
