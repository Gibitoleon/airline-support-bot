
from datetime import date
from typing import Any

from tools.flight.oag_client import OAGClient


OAG_FLIGHTS_ENDPOINT = "/flights"


def flight_schedule(
    flight_number: str,
    departure_date: str,
    carrier_code: str = "KQ",
    limit: int = 10
) -> dict[str, Any]:
    """
    Retrieve the published schedule for a specific airline flight.

    Args:
        flight_number: Numeric flight number, e.g. "100".
        departure_date: Departure date in YYYY-MM-DD format.
        carrier_code: Two-character IATA airline code. Defaults to KQ.
        limit: Maximum number of results (1-1000).

    Returns:
        A dictionary containing the published flight schedule.
    """

    # 1. Validate and normalize inputs
    if not isinstance(flight_number, str):
        flight_number = str(flight_number)

    flight_number = flight_number.strip()

    if not flight_number.isdigit() or len(flight_number) > 4:
        raise ValueError("Flight number must contain up to four digits.")

    if not isinstance(carrier_code, str):
        raise ValueError("Carrier code must be a string.")

    carrier_code = carrier_code.strip().upper()

    if not carrier_code.isalpha() or len(carrier_code) != 2:
        raise ValueError("Carrier code must be a two-letter IATA code.")

    # 2. Validate and normalize departure date
    try:
        departure_date = date.fromisoformat(
            departure_date.strip()
        ).isoformat()
    except (ValueError, TypeError, AttributeError):
        raise ValueError("Departure date must use YYYY-MM-DD format.")

    # 3. Validate result limit
    if (
        not isinstance(limit, int)
        or isinstance(limit, bool)
        or not 1 <= limit <= 1000
    ):
        raise ValueError("Limit must be an integer between 1 and 1000.")

    # 4. Build OAG Schedules API parameters
    params = {
        "IataCarrierCode": carrier_code,
        "FlightNumber": flight_number,
        "DepartureDate": departure_date,
        "Limit": limit
    }

    # 5. Call OAG API
    client = OAGClient()

    try:
        response = client.get(
            endpoint=OAG_FLIGHTS_ENDPOINT,
            params=params
        )
    finally:
        client.close()

    # 6. Extract useful schedule information
    flights = []

    for item in response.get("data", []):
        departure = item.get("departure") or {}
        arrival = item.get("arrival") or {}

        departure_airport = departure.get("airport") or {}
        arrival_airport = arrival.get("airport") or {}

        effective_period = item.get("effectivePeriod") or {}
        segment_info = item.get("segmentInfo") or {}
        carrier = item.get("carrierCode") or {}

        # Extract intermediate airports
        intermediate_airports = (
            segment_info.get("intermediateAirports") or {}
        )

        intermediate_stops = intermediate_airports.get("iata") or []

        flights.append({
            "flight_number": (
                f"{carrier.get('iata', carrier_code)}"
                f"{item.get('flightNumber', flight_number)}"
            ),
            "departure": {
                "airport": departure_airport.get("iata"),
                "time": departure.get("passengerLocalTime"),
                "utc_time": departure.get("passengerUtcTime"),
                "terminal": departure.get("terminal")
            },
            "arrival": {
                "airport": arrival_airport.get("iata"),
                "time": arrival.get("passengerLocalTime"),
                "utc_time": arrival.get("passengerUtcTime"),
                "terminal": arrival.get("terminal")
            },
            "duration": item.get("elapsedTime"),
            "stops": segment_info.get("numberOfStops"),
            "intermediate_airports": [
                stop.get("station")
                for stop in intermediate_stops
                if isinstance(stop, dict) and stop.get("station")
            ],
            "aircraft": item.get("aircraftType"),
            "effective_period": {
                "start": effective_period.get("startDate"),
                "end": effective_period.get("endDate")
            }
        })

    # 7. Return simplified schedule information
    return {
        "success": True,
        "airline": "Kenya Airways" if carrier_code == "KQ" else carrier_code,
        "flight_number": f"{carrier_code}{flight_number}",
        "departure_date": departure_date,
        "count": len(flights),
        "flights": flights,
        "pagination": response.get("paging", {})
    }
