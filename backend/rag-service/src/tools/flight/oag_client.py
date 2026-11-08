import os
from typing import Any

import requests
from dotenv import load_dotenv


class OAGAPIError(Exception):
    """Raised when an OAG API request fails."""

    def __init__(self, message: str, status_code: int | None = None):
        super().__init__(message)
        self.status_code = status_code


class OAGClient:
    BASE_URL = "https://api.oag.com"

    def __init__(self):
        load_dotenv()  # Load environment variables from .env file
        self.api_key = os.getenv("OAG_API_KEY")

        if not self.api_key:
            raise ValueError("OAG_API_KEY is not configured.")

        self.session = requests.Session()
        self.session.headers.update({
            "Subscription-Key": self.api_key,
            "Accept": "application/json"
        })

    def get(
        self,
        endpoint: str,
        params: dict[str, Any] | None = None
    ) -> dict:
        """
        Send a GET request to an OAG API endpoint.

        endpoint: API path or complete URL.
        params: Query parameters.
        """

        url = (
            endpoint
            if endpoint.startswith("https://")
            else f"{self.BASE_URL}/{endpoint.lstrip('/')}"
        )

        try:
            response = self.session.get(
                url,
                params=params,
                timeout=(5, 30)
            )

            if response.status_code == 400:
                raise OAGAPIError(
                    "Invalid OAG request parameters.",
                    400
                )

            if response.status_code == 401:
                raise OAGAPIError(
                    "OAG authentication failed. Check your subscription key.",
                    401
                )

            if response.status_code == 404:
                raise OAGAPIError(
                    "No matching flight information was found.",
                    404
                )

            if response.status_code == 406:
                raise OAGAPIError(
                    "OAG rejected the requested response format.",
                    406
                )

            if response.status_code >= 500:
                raise OAGAPIError(
                    "OAG is currently experiencing a server error.",
                    response.status_code
                )

            response.raise_for_status()

            return response.json()

        except requests.Timeout as exc:
            raise OAGAPIError(
                "The request to OAG timed out."
            ) from exc

        except requests.ConnectionError as exc:
            raise OAGAPIError(
                "Could not connect to OAG."
            ) from exc

        except requests.HTTPError as exc:
            raise OAGAPIError(
                "OAG returned an unexpected HTTP error.",
                response.status_code
            ) from exc

        except ValueError as exc:
            raise OAGAPIError(
                "OAG returned an invalid JSON response."
            ) from exc

    def close(self):
        self.session.close()