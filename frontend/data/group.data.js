/* ---------- Groups ---------- */
export const groupsData = {
  groups: [
    {
      id: 1,
      name: "CUSTOMER_SERVICE_AGENT",
      created_at: "2026-09-07T19:11:31.591Z",
      updated_at: "2026-09-07T19:11:31.591Z",
    },
    {
      id: 2,
      name: "HR",
      created_at: "2026-09-07T19:11:31.591Z",
      updated_at: "2026-09-07T19:11:31.591Z",
    },
    {
      id: 3,
      name: "Watchmen",
      created_at: "2026-09-26T11:48:19.951Z",
      updated_at: "2026-09-26T11:53:11.625Z",
    },
  ],
};

/* ---------- Group permissions (assignments) ---------- */
export const groupPermissionsData = {
  permissions: [
    {
      group_id: 1,
      permission_id: 1,
      created_at: "2026-09-07T19:11:33.507Z",
      updated_at: "2026-09-07T19:11:33.507Z",
      permission: {
        id: 1,
        name: "VIEW_CUSTOMER_DOCUMENTS",
        created_at: "2026-09-07T19:11:31.801Z",
        updated_at: "2026-09-07T19:11:31.801Z",
      },
    },
    {
      group_id: 1,
      permission_id: 2,
      created_at: "2026-09-07T19:11:33.507Z",
      updated_at: "2026-09-07T19:11:33.507Z",
      permission: {
        id: 2,
        name: "VIEW_CUSTOMER_SERVICE_DOCUMENTS",
        created_at: "2026-09-07T19:11:31.801Z",
        updated_at: "2026-09-07T19:11:31.801Z",
      },
    },
    {
      group_id: 2,
      permission_id: 3,
      created_at: "2026-09-08T10:00:00.000Z",
      updated_at: "2026-09-08T10:00:00.000Z",
      permission: {
        id: 3,
        name: "VIEW_HR_DOCUMENTS",
        created_at: "2026-09-07T19:11:31.801Z",
        updated_at: "2026-09-07T19:11:31.801Z",
      },
    },
    {
      group_id: 2,
      permission_id: 7,
      created_at: "2026-09-08T10:00:00.000Z",
      updated_at: "2026-09-08T10:00:00.000Z",
      permission: {
        id: 7,
        name: "VIEW_ANALYTICS",
        created_at: "2026-09-07T19:11:31.801Z",
        updated_at: "2026-09-07T19:11:31.801Z",
      },
    },
    {
      group_id: 3,
      permission_id: 1,
      created_at: "2026-09-26T11:48:19.951Z",
      updated_at: "2026-09-26T11:48:19.951Z",
      permission: {
        id: 1,
        name: "VIEW_CUSTOMER_DOCUMENTS",
        created_at: "2026-09-07T19:11:31.801Z",
        updated_at: "2026-09-07T19:11:31.801Z",
      },
    },
  ],
};

/* ---------- All available permissions (catalog) ---------- */
export const allPermissionsData = [
  { id: 1, name: "VIEW_CUSTOMER_DOCUMENTS" },
  { id: 2, name: "VIEW_CUSTOMER_SERVICE_DOCUMENTS" },
  { id: 3, name: "VIEW_HR_DOCUMENTS" },
  { id: 4, name: "VIEW_INTERNAL_DOCUMENTS" },
  { id: 5, name: "MANAGE_DOCUMENTS" },
  { id: 6, name: "MANAGE_USERS" },
  { id: 7, name: "VIEW_ANALYTICS" },
  { id: 8, name: "MANAGE_GROUPS" },
  { id: 9, name: "MANAGE_PERMISSIONS" },
  { id: 10, name: "VIEW_AUDIT_LOG" },
];

/* ---------- Group members (keyed by group_id) ---------- */
export const groupUsersData = {
  1: [
    {
      user_id: 1,
      group_id: 1,
      created_at: "2026-09-07T19:11:32.905Z",
      updated_at: "2026-09-07T19:11:32.905Z",
      user: {
        id: 1,
        email: "gabrielleon9928@gmail.com",
        role: { id: 1, name: "STAFF" },
        created_at: "2026-09-07T19:11:32.290Z",
      },
    },
    {
      user_id: 2,
      group_id: 1,
      created_at: "2026-09-08T10:24:15.120Z",
      updated_at: "2026-09-08T10:24:15.120Z",
      user: {
        id: 2,
        email: "gabrielleon161327@gmail.com",
        role: { id: 1, name: "STAFF" },
        created_at: "2026-09-07T19:11:32.290Z",
      },
    },
    {
      user_id: 3,
      group_id: 1,
      created_at: "2026-09-10T09:42:18.550Z",
      updated_at: "2026-09-10T09:42:18.550Z",
      user: {
        id: 3,
        email: "james.kimani@example.com",
        role: { id: 1, name: "STAFF" },
        created_at: "2026-09-10T08:24:15.420Z",
      },
    },
  ],
  2: [
    {
      user_id: 6,
      group_id: 2,
      created_at: "2026-09-18T17:12:36.925Z",
      updated_at: "2026-09-18T17:12:36.925Z",
      user: {
        id: 6,
        email: "mary.njeri@example.com",
        role: { id: 1, name: "STAFF" },
        created_at: "2026-09-18T16:45:21.305Z",
      },
    },
    {
      user_id: 7,
      group_id: 2,
      created_at: "2026-09-22T09:18:42.610Z",
      updated_at: "2026-09-22T09:18:42.610Z",
      user: {
        id: 7,
        email: "david.mwangi@example.com",
        role: { id: 1, name: "STAFF" },
        created_at: "2026-09-21T09:18:37.612Z",
      },
    },
  ],
  3: [
    {
      user_id: 8,
      group_id: 3,
      created_at: "2026-09-24T12:33:17.845Z",
      updated_at: "2026-09-24T12:33:17.845Z",
      user: {
        id: 8,
        email: "grace.akinyi@example.com",
        role: { id: 1, name: "STAFF" },
        created_at: "2026-09-24T11:27:09.841Z",
      },
    },
  ],
};