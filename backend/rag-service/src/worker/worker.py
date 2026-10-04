from config.redis.redis_config import redis_connection
from rq import SimpleWorker

worker = SimpleWorker(
    ["rag-document-ingestion", "rag-document-deletion"], connection=redis_connection
)


if __name__ == "__main__":
    worker.work()
