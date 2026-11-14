export default {
  async up(queryInterface) {
    // Local dummy staff account details
    const INITIAL_STAFF_1_EMAIL = "staff1.local@example.test";
    const INITIAL_STAFF_2_EMAIL = "staff2.local@example.test";

    const staffEmails = [INITIAL_STAFF_1_EMAIL, INITIAL_STAFF_2_EMAIL];

    // Retrieve the initial staff accounts
    const [users] = await queryInterface.sequelize.query(
      `SELECT id, email
       FROM users
       WHERE email IN (:staffEmails)`,
      {
        replacements: { staffEmails },
      },
    );

    if (users.length !== 2) {
      throw new Error(
        "Both initial dummy staff accounts must exist before assigning them to a group.",
      );
    }

    // Retrieve the customer service group
    const [groups] = await queryInterface.sequelize.query(
      `SELECT id
       FROM groups
       WHERE name = :groupName`,
      {
        replacements: {
          groupName: "CUSTOMER_SERVICE_AGENT",
        },
      },
    );

    const customerServiceGroup = groups[0];

    if (!customerServiceGroup) {
      throw new Error("CUSTOMER_SERVICE_AGENT group was not found.");
    }

    const userIds = users.map((user) => user.id);

    // Check for existing group assignments
    const [existingAssignments] = await queryInterface.sequelize.query(
      `SELECT user_id
       FROM user_groups
       WHERE user_id IN (:userIds)
       AND group_id = :groupId`,
      {
        replacements: {
          userIds,
          groupId: customerServiceGroup.id,
        },
      },
    );

    const assignedUserIds = new Set(
      existingAssignments.map((assignment) => assignment.user_id),
    );

    // Assign only staff accounts that are not already members
    const newAssignments = users.filter(
      (user) => !assignedUserIds.has(user.id),
    );

    if (newAssignments.length === 0) {
      console.log("Both dummy staff accounts are already assigned.");
      return;
    }

    const now = new Date();

    await queryInterface.bulkInsert(
      "user_groups",
      newAssignments.map((user) => ({
        user_id: user.id,
        group_id: customerServiceGroup.id,
        created_at: now,
        updated_at: now,
      })),
    );

    console.log(
      `Created ${newAssignments.length} dummy staff group assignment(s).`,
    );
  },

  async down(queryInterface) {
    const staffEmails = [
      "staff1.local@example.test",
      "staff2.local@example.test",
    ];

    const [users] = await queryInterface.sequelize.query(
      `SELECT id
       FROM users
       WHERE email IN (:staffEmails)`,
      {
        replacements: { staffEmails },
      },
    );

    if (users.length === 0) return;

    const [groups] = await queryInterface.sequelize.query(
      `SELECT id
       FROM groups
       WHERE name = :groupName`,
      {
        replacements: {
          groupName: "CUSTOMER_SERVICE_AGENT",
        },
      },
    );

    if (!groups[0]) return;

    await queryInterface.bulkDelete("user_groups", {
      user_id: users.map((user) => user.id),
      group_id: groups[0].id,
    });
  },
};
