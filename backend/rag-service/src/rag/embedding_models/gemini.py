import os
import time
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types
from .interface import EmbeddingManager


PROJECT_ROOT = Path(__file__).resolve().parents[4]
ENV_FILE = PROJECT_ROOT / ".env"

load_dotenv(ENV_FILE)

load_dotenv()  # Load environment variables from .env file


class GeminiEmbeddingManager(EmbeddingManager):
    def __init__(self):

        self.client = self.load_embeddingmodel()

    def load_embeddingmodel(self):
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        return client

    def create_embeddings(self, chunks):
        all_embeddings = []
        batch_size = 100

        for i in range(0, len(chunks), batch_size):
            batch = chunks[i : i + batch_size]
            print(f"Processing chunks {i + 1} to {i + len(batch)}")

            texts = [chunk.page_content for chunk in batch]

            # Create Content objects
            contents = [types.Content(parts=[types.Part(text=text)]) for text in texts]

            # CORRECT method: embed_content (NOT batch_embed_contents)
            response = self.client.models.embed_content(
                model="gemini-embedding-2",
                contents=contents,
            )

            batch_embeddings = [embedding.values for embedding in response.embeddings]
            print(f"Embeddings returned: {len(batch_embeddings)}")

            all_embeddings.extend(batch_embeddings)

            if i + batch_size < len(chunks):
                print("Batch completed. Waiting 1 second...")
                time.sleep(65)

        return all_embeddings
        all_embeddings = []
        batch_size = 100

        for i in range(0, len(chunks), batch_size):
            batch = chunks[i : i + batch_size]
            contents = [
                types.Content(parts=[types.Part(text=chunk.page_content)])
                for chunk in batch
            ]

            response = self.client.models.embed_content(
                model="gemini-embedding-2",
                contents=contents,
            )
            all_embeddings.extend(embedding.values for embedding in response.embeddings)

            if i + batch_size < len(chunks):
                time.sleep(65)

        return all_embeddings

    def create_query_embedding(self, query):
        content = types.Content(parts=[types.Part(text=query)])
        response = self.client.models.embed_content(
            model="gemini-embedding-2",
            contents=content,
        )
        return response.embeddings[0].values
        """
        Embed a list of query strings.
        Returns embeddings in the same order as the input list.
        
        all_embeddings = []
        batch_size = 100

        for i in range(0, len(queries), batch_size):
            batch = queries[i : i + batch_size]
            print(f"Processing queries {i + 1} to {i + len(batch)}")

            contents = [types.Content(parts=[types.Part(text=q)]) for q in batch]

            # embed_content accepts a list of strings directly
            response = self.client.models.embed_content(
                model="gemini-embedding-2",
                contents=contents,  # list of strings
            )

            batch_embeddings = [embedding.values for embedding in response.embeddings]
            print(f"Embeddings returned: {len(batch_embeddings)}")

            all_embeddings.extend(batch_embeddings)

            # Same delay as chunk embedding – 65 seconds between batches
            if i + batch_size < len(queries):
                print("Batch completed. Waiting 65 seconds...")
                time.sleep(65)

        return all_embeddings
            """
