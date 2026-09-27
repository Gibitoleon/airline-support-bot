"use strict";

export default {
    async up(queryInterface) {
        const timestamp = new Date();

        const documents = [
            {
                document_id: "KQ-AIRPORT-001",
                title: "Airport Lounge Services",
                origin: "KENYA AIRWAYS",
                domain: "AIRPORT_SERVICES",
                category: "LOUNGE_SERVICES",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BAG-001",
                title: "Baggage Allowance",
                origin: "KENYA AIRWAYS",
                domain: "BAGGAGE",
                category: "BAGGAGE_ALLOWANCE",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BAG-002",
                title: "Baggage Restrictions",
                origin: "KENYA AIRWAYS",
                domain: "BAGGAGE",
                category: "BAGGAGE_RESTRICTIONS",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BAG-003",
                title: "Delayed, Lost or Damaged Baggage",
                origin: "KENYA AIRWAYS",
                domain: "BAGGAGE",
                category: "BAGGAGE_DELAYED_LOST_DAMAGED",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BAG-004",
                title: "Hand Baggage",
                origin: "KENYA AIRWAYS",
                domain: "BAGGAGE",
                category: "HAND_BAGGAGE",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BAG-005",
                title: "Special Baggage",
                origin: "KENYA AIRWAYS",
                domain: "BAGGAGE",
                category: "SPECIAL_BAGGAGE",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BAG-006",
                title: "Baggage Service Desk Procedure",
                origin: "SYNTHETIC",
                domain: "BAGGAGE",
                category: "BAGGAGE_SERVICE_DESK_PROCEDURE",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER_SERVICE_AGENT"],
                access: "INTERNAL",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BAG-007",
                title: "Baggage Claim Handling Procedure",
                origin: "SYNTHETIC",
                domain: "BAGGAGE",
                category: "BAGGAGE_CLAIMS",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER_SERVICE_AGENT"],
                access: "INTERNAL",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BOOK-001",
                title: "Book a Flight",
                origin: "KENYA AIRWAYS",
                domain: "BOOKING",
                category: "FLIGHT_BOOKING",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BOOK-002",
                title: "Flight Upgrades",
                origin: "KENYA AIRWAYS",
                domain: "BOOKING",
                category: "FLIGHT_UPGRADES",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BOOK-003",
                title: "Payment Options",
                origin: "KENYA AIRWAYS",
                domain: "BOOKING",
                category: "PAYMENT_OPTIONS",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BOOK-004",
                title: "Refund Policy",
                origin: "KENYA AIRWAYS",
                domain: "BOOKING",
                category: "REFUNDS",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BOOK-005",
                title: "Seat Selection",
                origin: "KENYA AIRWAYS",
                domain: "BOOKING",
                category: "SEAT_SELECTION",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BOOK-006",
                title: "Customer Service Procedure for Flight Booking Queries",
                origin: "SYNTHETIC",
                domain: "BOOKING",
                category: "FLIGHT_BOOKING",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER_SERVICE_AGENT"],
                access: "INTERNAL",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-BOOK-007",
                title: "Customer Service Procedure for Booking Changes and Cancellations",
                origin: "SYNTHETIC",
                domain: "BOOKING",
                category: "BOOKING_MANAGEMENT",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER_SERVICE_AGENT"],
                access: "INTERNAL",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-CHECK-001",
                title: "Baggage Drop Off Services",
                origin: "KENYA AIRWAYS",
                domain: "CHECK_IN",
                category: "BAGGAGE_DROPOFF",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-CHECK-002",
                title: "Check-in",
                origin: "KENYA AIRWAYS",
                domain: "CHECK_IN",
                category: "CHECK_IN_PROCESS",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-CHECK-003",
                title: "Self-Service Airport Check-In",
                origin: "KENYA AIRWAYS",
                domain: "CHECK_IN",
                category: "SELF_SERVICE_CHECK_IN",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-CHECK-004",
                title: "Customer Service Procedure for Check-In and Boarding Pass Issues",
                origin: "SYNTHETIC",
                domain: "CHECK_IN",
                category: "BOARD_IN_PASS_SUPPORT_PROCEDURE",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER_SERVICE_AGENT"],
                access: "INTERNAL",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-CHECK-005",
                title: "Customer Service Procedure for Check-In Queries",
                origin: "SYNTHETIC",
                domain: "CHECK_IN",
                category: "CHECK_IN_SUPPORT",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER_SERVICE_AGENT"],
                access: "INTERNAL",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-DISR-001",
                title: "Flight Delays and Cancellations",
                origin: "KENYA AIRWAYS",
                domain: "FLIGHT_DISRUPTIONS",
                category: "DISRUPTION_REBOOKING",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-DISR-002",
                title: "Customer Service Procedure for Flight Disruptions",
                origin: "SYNTHETIC",
                domain: "FLIGHT_DISRUPTIONS",
                category: "DISRUPTION_SUPPORT",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER_SERVICE_AGENT"],
                access: "INTERNAL",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-ASSIST-001",
                title: "Passengers with Reduced Mobility",
                origin: "KENYA AIRWAYS",
                domain: "SPECIAL_ASSISTANCE",
                category: "DISABLED_PASSENGERS",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-ASSIST-002",
                title: "Expectant Mothers Travel Guidelines",
                origin: "KENYA AIRWAYS",
                domain: "SPECIAL_ASSISTANCE",
                category: "PREGNANCY_TRAVEL",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-ASSIST-003",
                title: "Infant and Toddler Travel",
                origin: "KENYA AIRWAYS",
                domain: "SPECIAL_ASSISTANCE",
                category: "INFANT_TODDLER_TRAVEL",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-ASSIST-004",
                title: "Medical and Special Needs Assistance",
                origin: "KENYA AIRWAYS",
                domain: "SPECIAL_ASSISTANCE",
                category: "MEDICAL_NEEDS",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-ASSIST-005",
                title: "Unaccompanied Minor Service",
                origin: "KENYA AIRWAYS",
                domain: "SPECIAL_ASSISTANCE",
                category: "UNACCOMPANIED_MINOR",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-SVC-001",
                title: "Class of Service",
                origin: "KENYA AIRWAYS",
                domain: "TRAVEL_SERVICES",
                category: "CLASS_OF_SERVICE",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-SVC-002",
                title: "Special Meals and Onboard Dining",
                origin: "KENYA AIRWAYS",
                domain: "TRAVEL_SERVICES",
                category: "MEALS",
                document_type: "POLICY",
                applicable_to: ["CUSTOMER", "CUSTOMER_SERVICE_AGENT"],
                access: "PUBLIC",
                status: "ACTIVE",
                language: "EN"
            },

            {
                document_id: "KQ-SVC-003",
                title: "Customer Service Procedure for Travel Service Requests",
                origin: "SYNTHETIC",
                domain: "TRAVEL_SERVICES",
                category: "SERVICE_REQUESTS",
                document_type: "PROCEDURE",
                applicable_to: ["CUSTOMER_SERVICE_AGENT"],
                access: "INTERNAL",
                status: "ACTIVE",
                language: "EN"
            }
        ];

        await queryInterface.bulkInsert(
            "documents",
            documents.map((document) => ({
                ...document,
                applicable_to: JSON.stringify(document.applicable_to),
                created_at: timestamp,
                updated_at: timestamp
            }))
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("documents", {
            document_id: [
                "KQ-AIRPORT-001",
                "KQ-BAG-001",
                "KQ-BAG-002",
                "KQ-BAG-003",
                "KQ-BAG-004",
                "KQ-BAG-005",
                "KQ-BAG-006",
                "KQ-BAG-007",
                "KQ-BOOK-001",
                "KQ-BOOK-002",
                "KQ-BOOK-003",
                "KQ-BOOK-004",
                "KQ-BOOK-005",
                "KQ-BOOK-006",
                "KQ-BOOK-007",
                "KQ-CHECK-001",
                "KQ-CHECK-002",
                "KQ-CHECK-003",
                "KQ-CHECK-004",
                "KQ-CHECK-005",
                "KQ-DISR-001",
                "KQ-DISR-002",
                "KQ-ASSIST-001",
                "KQ-ASSIST-002",
                "KQ-ASSIST-003",
                "KQ-ASSIST-004",
                "KQ-ASSIST-005",
                "KQ-SVC-001",
                "KQ-SVC-002",
                "KQ-SVC-003"
            ]
        });
    }
};


