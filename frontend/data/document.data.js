export const documentMetadata = [
  {
    id: 1,
    document_id: "KQ-AIRPORT-001",
    title: "Airport Lounge Services",
    origin: "KENYA AIRWAYS",
    domain: "AIRPORT_SERVICES",
    category: "LOUNGE_SERVICES",
    document_type: "POLICY",
    applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
    access: "PUBLIC",
    status: "ACTIVE",
    language: "EN",
    file_name: "lounge_services.md",
    file_path: "data/raw/airport_services/lounge_services.md",
    created_at: "2026-09-27T12:51:33.269Z",
    updated_at: "2026-09-27T12:51:33.269Z",
  },
  {
    id: 2,
    document_id: "KQ-BAG-001",
    title: "Baggage Allowance",
    origin: "KENYA AIRWAYS",
    domain: "BAGGAGE",
    category: "BAGGAGE_ALLOWANCE",
    document_type: "POLICY",
    applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
    access: "PUBLIC",
    status: "ACTIVE",
    language: "EN",
    file_name: "baggage_allowance.md",
    file_path: "data/raw/baggage/baggage_allowance.md",
    created_at: "2026-09-27T12:51:33.269Z",
    updated_at: "2026-09-27T12:51:33.269Z",
  },
  {
    id: 3,
    document_id: "KQ-BAG-006",
    title: "Baggage Service Desk Procedure",
    origin: "SYNTHETIC",
    domain: "BAGGAGE",
    category: "BAGGAGE_SERVICE_DESK_PROCEDURE",
    document_type: "PROCEDURE",
    applicable_to: ["CUSTOMER_SERVICE_AGENT"],
    access: "INTERNAL",
    status: "ACTIVE",
    language: "EN",
    file_name: "baggage_service_desk_procedure.md",
    file_path: "data/raw/baggage/baggage_service_desk_procedure.md",
    created_at: "2026-09-27T12:51:33.269Z",
    updated_at: "2026-09-27T12:51:33.269Z",
  },
  {
    id: 4,
    document_id: "KQ-BOOK-004",
    title: "Refund Policy",
    origin: "KENYA AIRWAYS",
    domain: "BOOKING",
    category: "REFUNDS",
    document_type: "POLICY",
    applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
    access: "PUBLIC",
    status: "ACTIVE",
    language: "EN",
    file_name: "refunds.md",
    file_path: "data/raw/bookings/refunds.md",
    created_at: "2026-09-27T12:51:33.269Z",
    updated_at: "2026-09-27T12:51:33.269Z",
  },
  {
    id: 5,
    document_id: "KQ-DISR-002",
    title: "Customer Service Procedure for Flight Disruptions",
    origin: "SYNTHETIC",
    domain: "FLIGHT_DISRUPTIONS",
    category: "DISRUPTION_SUPPORT",
    document_type: "PROCEDURE",
    applicable_to: ["CUSTOMER_SERVICE_AGENT"],
    access: "INTERNAL",
    status: "ACTIVE",
    language: "EN",
    file_name: "flight_disruptions_service_procedure.md",
    file_path: "data/raw/flight_disruptions/flight_disruptions_service_procedure.md",
    created_at: "2026-09-27T12:51:33.269Z",
    updated_at: "2026-09-27T12:51:33.269Z",
  },
  {
    id: 6,
    document_id: "KQ-CHECK-002",
    title: "Check-in",
    origin: "KENYA AIRWAYS",
    domain: "CHECK_IN",
    category: "CHECK_IN_PROCESS",
    document_type: "PROCEDURE",
    applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
    access: "PUBLIC",
    status: "ACTIVE",
    language: "EN",
    file_name: "check_in_process.md",
    file_path: "data/raw/check_in/check_in_process.md",
    created_at: "2026-09-27T12:51:33.269Z",
    updated_at: "2026-09-27T12:51:33.269Z",
  },
  {
    id: 7,
    document_id: "KQ-ASSIST-001",
    title: "Passengers with Reduced Mobility",
    origin: "KENYA AIRWAYS",
    domain: "SPECIAL_ASSISTANCE",
    category: "DISABLED_PASSENGERS",
    document_type: "POLICY",
    applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
    access: "PUBLIC",
    status: "ACTIVE",
    language: "EN",
    file_name: "disabled_passengers.md",
    file_path: "data/raw/special_assistance/disabled_passengers.md",
    created_at: "2026-09-27T12:51:33.269Z",
    updated_at: "2026-09-27T12:51:33.269Z",
  },
  {
    id: 8,
    document_id: "KQ-SVC-003",
    title: "Customer Service Procedure for Travel Service Requests",
    origin: "SYNTHETIC",
    domain: "TRAVEL_SERVICES",
    category: "SERVICE_REQUESTS",
    document_type: "PROCEDURE",
    applicable_to: ["CUSTOMER_SERVICE_AGENT"],
    access: "INTERNAL",
    status: "INACTIVE",
    language: "EN",
    file_name: "travel_service_procedure.md",
    file_path: "data/raw/travel_services/travel_service_procedure.md",
    created_at: "2026-09-27T12:51:33.269Z",
    updated_at: "2026-10-01T09:15:00.000Z",
  },
];

export const DOCUMENT_DOMAIN_OPTIONS = [
  "AIRPORT_SERVICES",
  "BAGGAGE",
  "BOOKING",
  "CHECK_IN",
  "FLIGHT_DISRUPTIONS",
  "SPECIAL_ASSISTANCE",
  "TRAVEL_SERVICES",
];

export const DOCUMENT_TYPE_OPTIONS = ["POLICY", "PROCEDURE"];
export const DOCUMENT_ACCESS_OPTIONS = ["PUBLIC", "INTERNAL"];
export const DOCUMENT_STATUS_OPTIONS = ["ACTIVE", "INACTIVE"];

export const DOCUMENT_STATUS_STYLES = {
  ACTIVE: {
    badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    dot: "bg-emerald-400",
  },
  INACTIVE: {
    badge: "bg-elevated text-muted border-border",
    dot: "bg-muted",
  },
};

export const DOCUMENT_ACCESS_STYLES = {
  PUBLIC: {
    badge: "bg-sky-400/10 text-sky-400 border-sky-400/20",
    dot: "bg-sky-400",
  },
  INTERNAL: {
    badge: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    dot: "bg-amber-400",
  },
};

/* ---------- Document content (swap for API later) ---------- */
export const documentContentById = {
  "KQ-AIRPORT-001": `---
document_id: KQ-AIRPORT-001
title: Airport Lounge Services
---

# Airport Lounge Services

## Overview

Kenya Airways operates lounges at major hubs for eligible passengers. Access is granted based on cabin class, frequent flyer tier, or partner agreements.

---

## Eligibility

- Business Class passengers on Kenya Airways operated flights.
- Platinum and Gold members of Asante Rewards.
- Eligible members of partner airline loyalty programmes.
- Priority Pass holders at select locations.

---

## Lounge Locations

- **Nairobi (NBO)** — Terminal 1A, near Gate 5.
- **Mombasa (MBA)** — Main Terminal, departures level.
- **Kisumu (KIS)** — Domestic departures.

---

## Important Information

Lounge access is subject to capacity and may be restricted during peak hours. Guests may be admitted for a fee where permitted.
`,

  "KQ-BAG-001": `---
document_id: KQ-BAG-001
title: Baggage Allowance
---

# Baggage Allowance

## Overview

Baggage allowances vary by cabin class, route, and fare family. The following outlines standard allowances for Kenya Airways operated flights.

---

## Checked Baggage

- **Economy (Light)** — 1 piece, up to 23 kg.
- **Economy (Classic)** — 2 pieces, up to 23 kg each.
- **Business Class** — 2 pieces, up to 32 kg each.

---

## Carry-on Baggage

- 1 piece up to 12 kg.
- Dimensions must not exceed 55 × 40 × 20 cm.

---

## Excess Baggage

Excess baggage is charged per kilogram and varies by route. Pre-purchase online for discounted rates.
`,

  "KQ-BAG-006": `---
document_id: KQ-BAG-006
title: Baggage Service Desk Procedure
---

# Baggage Service Desk Procedure

## Overview

This procedure outlines the steps a customer service agent must follow when handling baggage-related queries at the service desk.

---

## Step 1 — Verify Passenger Details

- Confirm the passenger's booking reference.
- Verify identity against the travel document.
- Log the query in the support system.

---

## Step 2 — Identify the Issue

- Delayed baggage.
- Damaged baggage.
- Lost baggage.
- Excess baggage charges.

---

## Step 3 — Take Action

- File a Property Irregularity Report (PIR) for delayed or lost baggage.
- Issue a damage report for damaged baggage.
- Provide the passenger with a reference number.

---

## Important Information

Agents must not commit to compensation amounts. All claims must be escalated to the Baggage Claims team.
`,

  "KQ-BOOK-004": `---
document_id: KQ-BOOK-004
title: Refund Policy
---

# Refund Policy

## Overview

Refund eligibility depends on the fare type purchased. Non-refundable fares may still qualify for tax refunds where applicable.

---

## Refundable Fares

- Full refund of base fare and taxes.
- Processed within 7–14 business days.
- Refunded to the original payment method.

---

## Non-Refundable Fares

- Base fare is not refundable.
- Government taxes and airport charges may be refundable.
- A processing fee may apply.

---

## How to Request a Refund

- Submit a request through the Kenya Airways website or contact centre.
- Provide the booking reference and passenger details.
- Refunds are processed after travel date verification.

---

## Important Information

Refund requests must be submitted within 12 months of the original travel date.
`,

  "KQ-DISR-002": `---
document_id: KQ-DISR-002
title: Customer Service Procedure for Flight Disruptions
---

# Flight Disruptions — Customer Service Procedure

## Overview

Flight disruptions include cancellations, delays, and diversions. Agents must follow this procedure to ensure consistent passenger handling.

---

## Step 1 — Confirm the Disruption

- Verify the flight status in the operational system.
- Confirm the disruption reason (weather, technical, operational).

---

## Step 2 — Inform the Passenger

- Notify the passenger of the disruption and reason.
- Provide rebooking or refund options where applicable.

---

## Step 3 — Duty of Care

- Provide meal vouchers where delays exceed the applicable threshold.
- Arrange hotel accommodation for overnight disruptions.
- Arrange transport between airport and hotel.

---

## Step 4 — Escalation

- Escalate to the Duty Manager for disputes.
- Document all interactions in the support system.

---

## Important Information

Compensation is governed by the applicable regulation for the route. Do not commit to compensation amounts without approval.
`,

  "KQ-CHECK-002": `---
document_id: KQ-CHECK-002
title: Check-in
---

# Check-in

## Overview

Check-in options include online, mobile, kiosk, and airport counter. Check-in deadlines vary by airport and route.

---

## Online Check-in

- Opens 30 hours before departure.
- Closes 1 hour before departure for most routes.
- Available for passengers with confirmed bookings.

---

## Airport Check-in

- Counters open 3 hours before departure.
- Close 1 hour before departure for international flights.
- Close 45 minutes before departure for domestic flights.

---

## Required Documents

- Valid passport or travel document.
- Visa or entry permit where required.
- Booking reference or e-ticket.

---

## Important Information

Passengers must be at the boarding gate at least 30 minutes before departure. Late arrivals may be denied boarding.
`,

  "KQ-ASSIST-001": `---
document_id: KQ-ASSIST-001
title: Passengers with Reduced Mobility
---

# Passengers with Reduced Mobility

## Overview

Kenya Airways is committed to providing safe and dignified travel for passengers with reduced mobility (PRM).

---

## Assistance Categories

- **WCHR** — Can walk short distances and climb stairs.
- **WCHS** — Cannot climb stairs but can walk short distances.
- **WCHC** — Completely immobile.

---

## Booking Assistance

- Request assistance at least 48 hours before departure.
- Specify the assistance category when booking.
- Confirm mobility aids (wheelchair, walking frame) in advance.

---

## At the Airport

- Assistance is available from arrival at the airport to boarding.
- Passengers are prioritised for boarding.
- Mobility aids are carried in the cabin where possible.

---

## Important Information

Passengers travelling with a service animal must notify the airline in advance and provide relevant documentation.
`,

  "KQ-SVC-003": `---
document_id: KQ-SVC-003
title: Customer Service Procedure for Travel Service Requests
---

# Travel Service Requests — Customer Service Procedure

## Overview

Travel service requests include special meals, seat preferences, and ancillary services. Agents must follow this procedure to ensure consistent handling.

---

## Step 1 — Identify the Request

- Special meal requests.
- Seat selection.
- Extra baggage.
- Unaccompanied minor service.

---

## Step 2 — Confirm Eligibility

- Check that the request can be fulfilled on the route and aircraft.
- Confirm any applicable charges with the passenger.

---

## Step 3 — Submit the Request

- Add the request to the booking.
- Provide the passenger with a confirmation.
- Note any deadlines (e.g. meal requests must be made 24 hours before departure).

---

## Important Information

Some requests cannot be guaranteed and are subject to operational availability.
`,
};