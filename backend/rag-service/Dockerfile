FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --timeout=120 --retries=10 \
    -r requirements.txt

COPY src/ ./src/
COPY data/raw/ ./data/raw/
COPY data/processed/vector_store/ ./data/processed/vector_store/

ENV CHROMA_PERSIST_DIRECTORY=/app/data/processed/vector_store
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

EXPOSE 5001

WORKDIR /app/src

CMD ["python", "app.py"]