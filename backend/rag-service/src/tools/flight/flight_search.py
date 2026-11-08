
from datetime import date
from typing import Any

from tools.flight.oag_client import OAGClient


OAG_FLIGHT_INSTANCES_ENDPOINT = "/flight-instances/"


def flight_search(
    departure_airport: str,
    arrival_airport: str,
    departure_date: str,
    limit: int = 100
) -> dict[str, Any]:
    """
    Search Kenya Airways scheduled flights using route and departure date.

    Args:
        departure_airport: Three-character IATA departure airport code.
        arrival_airport: Three-character IATA arrival airport code.
        departure_date: Departure date in YYYY-MM-DD format.
        limit: Maximum number of results (1-1000).

    Returns:
        A dictionary containing matching scheduled flights and pagination data.
    """

    # 1. Validate and normalize airport codes
    if not isinstance(departure_airport, str) or not isinstance(arrival_airport, str):
        raise ValueError("Departure and arrival airports must be strings.")

    departure_airport = departure_airport.strip().upper()
    arrival_airport = arrival_airport.strip().upper()

    if not departure_airport or not arrival_airport:
        raise ValueError("Departure and arrival airports are required.")

    if len(departure_airport) != 3 or len(arrival_airport) != 3:
        raise ValueError("Airport codes must be three-character IATA codes.")

    # 2. Validate and normalize departure date
    try:
        departure_date = date.fromisoformat(departure_date.strip()).isoformat()
    except (ValueError, TypeError, AttributeError):
        raise ValueError("Departure date must use YYYY-MM-DD format.")

    # 3. Validate result limit
    if not isinstance(limit, int) or isinstance(limit, bool) or not 1 <= limit <= 1000:
        raise ValueError("Limit must be an integer between 1 and 1000.")

    # 4. Build OAG query parameters
    params = {
        "version": "v2",
        "CarrierCode": "KQ",
        "DepartureAirport": departure_airport,
        "ArrivalAirport": arrival_airport,
        "DepartureDateTime": departure_date,
        "FlightType": "Scheduled",
        "CodeType": "IATA",
        "Limit": limit
    }

    # 5. Call OAG API
    client = OAGClient()

    try:
        response = client.get(
            endpoint=OAG_FLIGHT_INSTANCES_ENDPOINT,
            params=params
        )
    finally:
        client.close()

    # 6. Extract and simplify useful flight information
    flights = []

    for item in response.get("data", []):
        departure = item.get("departure") or {}
        arrival = item.get("arrival") or {}

        departure_airport_data = departure.get("airport") or {}
        arrival_airport_data = arrival.get("airport") or {}

        departure_date_data = departure.get("date") or {}
        departure_time_data = departure.get("time") or {}

        arrival_date_data = arrival.get("date") or {}
        arrival_time_data = arrival.get("time") or {}

        carrier = item.get("carrier") or {}
        segment_info = item.get("segmentInfo") or {}
        aircraft = item.get("aircraftType") or {}

        flights.append({
            "flight_number": (
                f"{carrier.get('iata', 'KQ')}{item.get('flightNumber', '')}"
            ),
            "departure": {
                "airport": departure_airport_data.get("iata"),
                "date": departure_date_data.get("local"),
                "time": departure_time_data.get("local")
            },
            "arrival": {
                "airport": arrival_airport_data.get("iata"),
                "date": arrival_date_data.get("local"),
                "time": arrival_time_data.get("local")
            },
            "duration": item.get("elapsedTime"),
            "stops": segment_info.get("numberOfStops"),
            "aircraft": aircraft.get("iata")
        })

    # 7. Return a simplified result for the orchestrator
    return {
        "success": True,
        "count": len(flights),
        "flights": flights,
        "pagination": response.get("paging", {})
    }
