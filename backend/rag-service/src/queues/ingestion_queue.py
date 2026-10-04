from rq import Queue
from config.redis.redis_config import redis_connection

ingestion_queue = Queue("rag-document-ingestion", connection=redis_connection)
