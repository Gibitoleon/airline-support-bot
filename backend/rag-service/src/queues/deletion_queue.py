from rq import Queue
from config.redis.redis_config import redis_connection


deletion_queue = Queue("rag-document-deletion", connection=redis_connection)
