import os

from dotenv import load_dotenv
from redis import Redis

load_dotenv()  # Load environment variables from .env file

redis_connection = Redis(
    host=os.getenv("REDIS_HOST"),
    port=int(os.getenv("REDIS_PORT")),
    username="default",
    password=os.getenv("REDIS_PASSWORD"),
)
