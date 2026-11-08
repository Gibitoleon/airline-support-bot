
from functools import partial

from tools.knowledge_base import knowledge_base_search
from tools.flight.flight_search import flight_search
from tools.flight.flight_schedule import flight_schedule
from tools.flight.flight_status import flight_status


def build_tool_registry(retrieval_service, permissions):
    """
    Build the available tool registry for the current request.

    Returns:
        A dictionary containing tool definitions and executable functions.
    """

    registry = {

        "knowledge_base_search": {
            "definition": {
                "type": "function",
                "function": {
                    "name": "knowledge_base_search",
                    "description": (
                        "Search Kenya Airways knowledge base for "
                        "policies, baggage information, check-in "
                        "requirements and other airline-related questions."
                    ),
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "query": {
                                "type": "string",
                                "description": "The question to search for."
                            }
                        },
                        "required": ["query"]
                    }
                }
            },
            "execute": partial(
                knowledge_base_search,
                retrieval_service=retrieval_service,
                permissions=permissions
            )
        },

        "flight_search": {
            "definition": {
                "type": "function",
                "function": {
                    "name": "flight_search",
                    "description": (
                        "Find scheduled Kenya Airways flights "
                        "between two airports on a given date."
                    ),
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "departure_airport": {
                                "type": "string",
                                "description": "Three-letter IATA departure airport code."
                            },
                            "arrival_airport": {
                                "type": "string",
                                "description": "Three-letter IATA arrival airport code."
                            },
                            "departure_date": {
                                "type": "string",
                                "description": "Departure date in YYYY-MM-DD format."
                            },
                            "limit": {
                                "type": "integer",
                                "description": "Maximum number of results."
                            }
                        },
                        "required": [
                            "departure_airport",
                            "arrival_airport",
                            "departure_date"
                        ]
                    }
                }
            },
            "execute": flight_search
        },

        "flight_schedule": {
            "definition": {
                "type": "function",
                "function": {
                    "name": "flight_schedule",
                    "description": (
                        "Retrieve the published schedule for a known "
                        "Kenya Airways flight number and departure date."
                    ),
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "flight_number": {
                                "type": "string",
                                "description": "Numeric flight number, for example 202."
                            },
                            "departure_date": {
                                "type": "string",
                                "description": "Departure date in YYYY-MM-DD format."
                            }
                        },
                        "required": [
                            "flight_number",
                            "departure_date"
                        ]
                    }
                }
            },
            "execute": flight_schedule
        },

        "flight_status": {
            "definition": {
                "type": "function",
                "function": {
                    "name": "flight_status",
                    "description": (
                        "Retrieve the operational status of a Kenya Airways "
                        "flight, including delays, departure and arrival updates."
                    ),
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "flight_number": {
                                "type": "string",
                                "description": "Numeric flight number, for example 202."
                            },
                            "departure_date": {
                                "type": "string",
                                "description": "Departure date in YYYY-MM-DD format."
                            }
                        },
                        "required": [
                            "flight_number",
                            "departure_date"
                        ]
                    }
                }
            },
            "execute": flight_status
        }
    }

    return registry
