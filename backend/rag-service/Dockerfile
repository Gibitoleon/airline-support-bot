
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

# Install CPU-only PyTorch
RUN pip install --no-cache-dir \
    torch==2.15.0+cpu \
    --index-url https://download.pytorch.org/whl/cpu

# Install the remaining application dependencies
RUN pip install --no-cache-dir --timeout=120 --retries=10 \
    -r requirements.txt

COPY src/ ./src/
COPY data/raw/ ./data/raw/
COPY data/processed/vector_store/ ./data/processed/vector_store/

ENV CHROMA_PERSIST_DIRECTORY=/app/data/processed/vector_store

EXPOSE 5001

WORKDIR /app/src

CMD ["python", "app.py"]
