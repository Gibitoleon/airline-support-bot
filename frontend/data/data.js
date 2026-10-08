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

 const invitationData = [
    {
        id: 1,
        email: "james.kimani@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-10T14:30:00.000Z",
        createdAt: "2026-10-06T14:30:00.000Z",
    },
    {
        id: 2,
        email: "sarah.wanjiku@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-10-05T09:15:00.000Z",
        createdAt: "2026-10-01T09:15:00.000Z",
    },
    {
        id: 3,
        email: "brian.otieno@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-12T11:45:00.000Z",
        createdAt: "2026-10-08T11:45:00.000Z",
    },
    {
        id: 4,
        email: "mary.njeri@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-09-30T16:20:00.000Z",
        createdAt: "2026-09-26T16:20:00.000Z",
    },
    {
        id: 5,
        email: "david.mwangi@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-14T08:30:00.000Z",
        createdAt: "2026-10-07T08:30:00.000Z",
    },
    {
        id: 6,
        email: "grace.akinyi@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-09-28T13:00:00.000Z",
        createdAt: "2026-09-24T13:00:00.000Z",
    },
    {
        id: 7,
        email: "kevin.mutua@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-15T10:10:00.000Z",
        createdAt: "2026-10-08T10:10:00.000Z",
    },
    {
        id: 8,
        email: "lilian.auma@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-10-02T15:40:00.000Z",
        createdAt: "2026-09-28T15:40:00.000Z",
    },
    {
        id: 9,
        email: "samuel.kiptoo@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-18T12:25:00.000Z",
        createdAt: "2026-10-11T12:25:00.000Z",
    },
    {
        id: 10,
        email: "faith.chebet@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-10-01T09:50:00.000Z",
        createdAt: "2026-09-27T09:50:00.000Z",
    },
    {
        id: 11,
        email: "daniel.omondi@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-20T14:15:00.000Z",
        createdAt: "2026-10-13T14:15:00.000Z",
    },
    {
        id: 12,
        email: "ann.muthoni@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-09-29T11:35:00.000Z",
        createdAt: "2026-09-25T11:35:00.000Z",
    },
    {
        id: 13,
        email: "peter.kariuki@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-16T16:45:00.000Z",
        createdAt: "2026-10-09T16:45:00.000Z",
    },
    {
        id: 14,
        email: "caroline.wambui@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-10-04T10:05:00.000Z",
        createdAt: "2026-09-30T10:05:00.000Z",
    },
    {
        id: 15,
        email: "michael.kipchirchir@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-19T13:30:00.000Z",
        createdAt: "2026-10-12T13:30:00.000Z",
    },
    {
        id: 16,
        email: "esther.nyambura@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-09-27T08:20:00.000Z",
        createdAt: "2026-09-23T08:20:00.000Z",
    },
    {
        id: 17,
        email: "alex.maina@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-22T09:40:00.000Z",
        createdAt: "2026-10-15T09:40:00.000Z",
    },
    {
        id: 18,
        email: "ruth.atieno@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-10-03T17:10:00.000Z",
        createdAt: "2026-09-29T17:10:00.000Z",
    },
    {
        id: 19,
        email: "george.ndungu@example.com",
        role: "Staff",
        status: "PENDING",
        expiresAt: "2026-10-21T11:55:00.000Z",
        createdAt: "2026-10-14T11:55:00.000Z",
    },
    {
        id: 20,
        email: "jane.nyokabi@example.com",
        role: "Staff",
        status: "ACCEPTED",
        expiresAt: "2026-10-06T14:05:00.000Z",
        createdAt: "2026-10-02T14:05:00.000Z",
    },
];

 const usersData = [
    {
        id: 1,
        email: "gabrielleon9928@gmail.com",
        created_at: "2026-09-07T19:11:32.290Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    },
    {
        id: 2,
        email: "gabrielleon161327@gmail.com",
        created_at: "2026-09-07T19:11:32.290Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    },
    {
        id: 3,
        email: "james.kimani@example.com",
        created_at: "2026-09-10T08:24:15.420Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    },
    {
        id: 4,
        email: "sarah.wanjiku@example.com",
        created_at: "2026-09-12T14:36:51.180Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    },
    {
        id: 5,
        email: "brian.otieno@example.com",
        created_at: "2026-09-15T10:12:44.735Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    },
    {
        id: 6,
        email: "mary.njeri@example.com",
        created_at: "2026-09-18T16:45:21.305Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    },
    {
        id: 7,
        email: "david.mwangi@example.com",
        created_at: "2026-09-21T09:18:37.612Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    },
    {
        id: 8,
        email: "grace.akinyi@example.com",
        created_at: "2026-09-24T11:27:09.841Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    },
    {
        id: 9,
        email: "kevin.mutua@example.com",
        created_at: "2026-09-28T13:52:46.190Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    },
    {
        id: 10,
        email: "lilian.auma@example.com",
        created_at: "2026-10-02T07:41:23.557Z",
        role: {
            id: 1,
            name: "STAFF"
        }
    }
];

 const userGroupsData = {
    groups: [
        {
            user_id: 1,
            group_id: 1,
            created_at: "2026-09-07T19:11:32.905Z",
            updated_at: "2026-09-07T19:11:32.905Z",
            group: {
                id: 1,
                name: "CUSTOMER_SERVICE_AGENT",
                created_at: "2026-09-07T19:11:31.591Z",
                updated_at: "2026-09-07T19:11:31.591Z"
            }
        },
        {
            user_id: 1,
            group_id: 2,
            created_at: "2026-09-08T10:24:15.120Z",
            updated_at: "2026-09-08T10:24:15.120Z",
            group: {
                id: 2,
                name: "OPERATIONS",
                created_at: "2026-09-07T19:11:31.700Z",
                updated_at: "2026-09-07T19:11:31.700Z"
            }
        },

        {
            user_id: 2,
            group_id: 1,
            created_at: "2026-09-09T08:35:42.310Z",
            updated_at: "2026-09-09T08:35:42.310Z",
            group: {
                id: 1,
                name: "CUSTOMER_SERVICE_AGENT",
                created_at: "2026-09-07T19:11:31.591Z",
                updated_at: "2026-09-07T19:11:31.591Z"
            }
        },

        {
            user_id: 3,
            group_id: 3,
            created_at: "2026-09-10T09:42:18.550Z",
            updated_at: "2026-09-10T09:42:18.550Z",
            group: {
                id: 3,
                name: "DOCUMENT_MANAGEMENT",
                created_at: "2026-09-07T19:11:31.820Z",
                updated_at: "2026-09-07T19:11:31.820Z"
            }
        },
        {
            user_id: 3,
            group_id: 4,
            created_at: "2026-09-11T14:16:33.275Z",
            updated_at: "2026-09-11T14:16:33.275Z",
            group: {
                id: 4,
                name: "REPORTING",
                created_at: "2026-09-07T19:11:31.950Z",
                updated_at: "2026-09-07T19:11:31.950Z"
            }
        },

        {
            user_id: 4,
            group_id: 1,
            created_at: "2026-09-12T15:02:47.430Z",
            updated_at: "2026-09-12T15:02:47.430Z",
            group: {
                id: 1,
                name: "CUSTOMER_SERVICE_AGENT",
                created_at: "2026-09-07T19:11:31.591Z",
                updated_at: "2026-09-07T19:11:31.591Z"
            }
        },

        {
            user_id: 5,
            group_id: 2,
            created_at: "2026-09-15T11:28:09.640Z",
            updated_at: "2026-09-15T11:28:09.640Z",
            group: {
                id: 2,
                name: "OPERATIONS",
                created_at: "2026-09-07T19:11:31.700Z",
                updated_at: "2026-09-07T19:11:31.700Z"
            }
        },
        {
            user_id: 5,
            group_id: 4,
            created_at: "2026-09-16T13:45:21.810Z",
            updated_at: "2026-09-16T13:45:21.810Z",
            group: {
                id: 4,
                name: "REPORTING",
                created_at: "2026-09-07T19:11:31.950Z",
                updated_at: "2026-09-07T19:11:31.950Z"
            }
        },

        {
            user_id: 6,
            group_id: 3,
            created_at: "2026-09-18T17:12:36.925Z",
            updated_at: "2026-09-18T17:12:36.925Z",
            group: {
                id: 3,
                name: "DOCUMENT_MANAGEMENT",
                created_at: "2026-09-07T19:11:31.820Z",
                updated_at: "2026-09-07T19:11:31.820Z"
            }
        },

        {
            user_id: 7,
            group_id: 1,
            created_at: "2026-09-21T10:04:51.370Z",
            updated_at: "2026-09-21T10:04:51.370Z",
            group: {
                id: 1,
                name: "CUSTOMER_SERVICE_AGENT",
                created_at: "2026-09-07T19:11:31.591Z",
                updated_at: "2026-09-07T19:11:31.591Z"
            }
        },
        {
            user_id: 7,
            group_id: 2,
            created_at: "2026-09-22T09:18:42.610Z",
            updated_at: "2026-09-22T09:18:42.610Z",
            group: {
                id: 2,
                name: "OPERATIONS",
                created_at: "2026-09-07T19:11:31.700Z",
                updated_at: "2026-09-07T19:11:31.700Z"
            }
        },

        {
            user_id: 8,
            group_id: 4,
            created_at: "2026-09-24T12:33:17.845Z",
            updated_at: "2026-09-24T12:33:17.845Z",
            group: {
                id: 4,
                name: "REPORTING",
                created_at: "2026-09-07T19:11:31.950Z",
                updated_at: "2026-09-07T19:11:31.950Z"
            }
        },

        {
            user_id: 9,
            group_id: 1,
            created_at: "2026-09-28T14:21:53.190Z",
            updated_at: "2026-09-28T14:21:53.190Z",
            group: {
                id: 1,
                name: "CUSTOMER_SERVICE_AGENT",
                created_at: "2026-09-07T19:11:31.591Z",
                updated_at: "2026-09-07T19:11:31.591Z"
            }
        },
        {
            user_id: 9,
            group_id: 3,
            created_at: "2026-09-29T11:47:26.430Z",
            updated_at: "2026-09-29T11:47:26.430Z",
            group: {
                id: 3,
                name: "DOCUMENT_MANAGEMENT",
                created_at: "2026-09-07T19:11:31.820Z",
                updated_at: "2026-09-07T19:11:31.820Z"
            }
        },

        {
            user_id: 10,
            group_id: 2,
            created_at: "2026-10-02T08:36:14.720Z",
            updated_at: "2026-10-02T08:36:14.720Z",
            group: {
                id: 2,
                name: "OPERATIONS",
                created_at: "2026-09-07T19:11:31.700Z",
                updated_at: "2026-09-07T19:11:31.700Z"
            }
        },
        {
            user_id: 10,
            group_id: 4,
            created_at: "2026-10-03T10:15:39.580Z",
            updated_at: "2026-10-03T10:15:39.580Z",
            group: {
                id: 4,
                name: "REPORTING",
                created_at: "2026-09-07T19:11:31.950Z",
                updated_at: "2026-09-07T19:11:31.950Z"
            }
        }
    ]
};
export {navigationItems, dashboardData , invitationData, usersData , userGroupsData};