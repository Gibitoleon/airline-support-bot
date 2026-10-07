import {
    LayoutDashboard,
    Users,
    FileText,
    UsersRound,
    ShieldCheck,
    LogOut
} from "lucide-react";

 const navigationItems = [
    {
        label: "Dashboard",
        to: "/dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Users",
        to: "/users",
        icon: Users
    },
    {
        label: "Documents",
        to: "/documents",
        icon: FileText
    },
    {
        label: "Groups",
        to: "/groups",
        icon: UsersRound
    },
    {
        label: "Permissions",
        to: "/permissions",
        icon: ShieldCheck
    },
    {
        label: "Logout",
        to: null,
        icon: LogOut
    }
];

 const dashboardData = {
    status: "SUCCESS",

    analytics: {
        queries: {
            overview: {
                totalQueries: 19,
                answeredQueries: 17,
                pendingQueries: 2
            },

            queriesByStatus: [
                {
                    status: "pending",
                    count: 2
                },
                {
                    status: "answered",
                    count: 17
                }
            ],

            dailyQueryVolume: [
                {
                    date: "2026-09-22",
                    count: 3
                },
                {
                    date: "2026-10-04",
                    count: 4
                },
                {
                    date: "2026-10-05",
                    count: 12
                }
            ]
        },

        documents: {
            overview: {
                totalDocuments: 30,
                activeDocuments: 30
            },

            documentsByDomain: [
                {
                    domain: "BOOKING",
                    count: 7
                },
                {
                    domain: "BAGGAGE",
                    count: 7
                },
                {
                    domain: "CHECK_IN",
                    count: 5
                },
                {
                    domain: "SPECIAL_ASSISTANCE",
                    count: 5
                },
                {
                    domain: "TRAVEL_SERVICES",
                    count: 3
                },
                {
                    domain: "FLIGHT_DISRUPTIONS",
                    count: 2
                },
                {
                    domain: "AIRPORT_SERVICES",
                    count: 1
                }
            ],

            documentsByStatus: [
                {
                    status: "ACTIVE",
                    count: 30
                }
            ],

            documentsByAccess: [
                {
                    access: "INTERNAL",
                    count: 8
                },
                {
                    access: "PUBLIC",
                    count: 22
                }
            ]
        }
    }
};



export {navigationItems, dashboardData};