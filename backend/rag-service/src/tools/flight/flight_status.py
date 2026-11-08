
from datetime import date
from typing import Any

from tools.flight.oag_client import OAGClient


OAG_FLIGHT_ENDPOINT = "/flight-instances/"


def flight_status(
    flight_number: str,
    departure_date: str
) -> dict[str, Any]:
    """
    Retrieve the operational status of a Kenya Airways flight.

    Args:
        flight_number: Flight number, e.g. KQ100 or 100.
        departure_date: Departure date in YYYY-MM-DD format.

    Returns:
        A dictionary containing operational flight status information.
    """

    # 1. Validate and normalize flight number
    if not isinstance(flight_number, str):
        raise ValueError("Flight number must be a string.")

    flight_number = flight_number.strip().upper()

    # Accept either KQ100 or 100
    if flight_number.startswith("KQ"):
        flight_number = flight_number[2:]

    if not flight_number.isdigit() or len(flight_number) > 4:
        raise ValueError("Provide a valid Kenya Airways flight number.")

    # 2. Validate and normalize departure date
    try:
        departure_date = date.fromisoformat(
            departure_date.strip()
        ).isoformat()
    except (ValueError, TypeError, AttributeError):
        raise ValueError("Departure date must use YYYY-MM-DD format.")

    # 3. Build OAG query parameters
    params = {
        "version": "v2",
        "CarrierCode": "KQ",
        "FlightNumber": flight_number,
        "DepartureDateTime": departure_date,
        "Content": "Status",
        "CodeType": "IATA",
        "Limit": 10
    }

    # 4. Call OAG API
    client = OAGClient()

    try:
        response = client.get(
            endpoint=OAG_FLIGHT_ENDPOINT,
            params=params
        )
    finally:
        client.close()

    data = response.get("data") or []

    # 5. Find the matching flight
    flight = next(
        (
            item for item in data
            if str(item.get("flightNumber", "")) == flight_number
            and (item.get("carrier") or {}).get("iata") == "KQ"
            and (item.get("departure") or {}).get("date", {}).get("local")
                == departure_date
        ),
        None
    )

    if not flight:
        return {
            "success": True,
            "found": False,
            "message": (
                f"No Kenya Airways flight KQ{flight_number} "
                f"was found for {departure_date}."
            )
        }

    # 6. Extract status information
    status_details = flight.get("statusDetails") or []

    if not status_details:
        return {
            "success": True,
            "found": True,
            "status_available": False,
            "flight_number": f"KQ{flight_number}",
            "message": "Flight found, but operational status is unavailable."
        }

    status = status_details[0]

    departure = flight.get("departure") or {}
    arrival = flight.get("arrival") or {}

    departure_airport = departure.get("airport") or {}
    arrival_airport = arrival.get("airport") or {}

    departure_date_info = departure.get("date") or {}
    departure_time_info = departure.get("time") or {}

    arrival_date_info = arrival.get("date") or {}
    arrival_time_info = arrival.get("time") or {}

    status_departure = status.get("departure") or {}
    status_arrival = status.get("arrival") or {}

    departure_estimated = status_departure.get("estimatedTime") or {}
    departure_actual = status_departure.get("actualTime") or {}

    arrival_estimated = status_arrival.get("estimatedTime") or {}
    arrival_actual = status_arrival.get("actualTime") or {}

    diversion_airport = status.get("diversionAirport") or {}

    # 7. Return simplified operational information
    return {
        "success": True,
        "found": True,
        "status_available": True,
        "flight_number": f"KQ{flight_number}",
        "status": status.get("state"),
        "last_updated": status.get("updatedAt"),
        "legs_total": status.get("legsTotal"),

        "departure": {
            "airport": departure_airport.get("iata"),
            "scheduled_date": departure_date_info.get("local"),
            "scheduled_time": departure_time_info.get("local"),
            "estimated_time": {
                "out_gate": departure_estimated.get("outGate"),
                "off_ground": departure_estimated.get("offGround"),
                "timeliness": departure_estimated.get("outGateTimeliness"),
                "variation": departure_estimated.get("outGateVariation")
            },
            "actual_time": {
                "out_gate": departure_actual.get("outGate"),
                "off_ground": departure_actual.get("offGround"),
                "timeliness": departure_actual.get("outGateTimeliness"),
                "variation": departure_actual.get("outGateVariation")
            },
            "terminal": status_departure.get("actualTerminal"),
            "gate": status_departure.get("gate"),
            "check_in_counter": status_departure.get("checkInCounter")
        },

        "arrival": {
            "airport": arrival_airport.get("iata"),
            "scheduled_date": arrival_date_info.get("local"),
            "scheduled_time": arrival_time_info.get("local"),
            "estimated_time": {
                "on_ground": arrival_estimated.get("onGround"),
                "in_gate": arrival_estimated.get("inGate"),
                "timeliness": arrival_estimated.get("inGateTimeliness"),
                "variation": arrival_estimated.get("inGateVariation")
            },
            "actual_time": {
                "on_ground": arrival_actual.get("onGround"),
                "in_gate": arrival_actual.get("inGate"),
                "timeliness": arrival_actual.get("inGateTimeliness"),
                "variation": arrival_actual.get("inGateVariation")
            },
            "terminal": status_arrival.get("actualTerminal"),
            "gate": status_arrival.get("gate"),
            "baggage": status_arrival.get("baggage")
        },

        "diversion": {
            "airport": diversion_airport.get("iata"),
            "operation_type": status.get("irregularOperationType"),
            "diversion_type": status.get("diversionType")
        }
    }
