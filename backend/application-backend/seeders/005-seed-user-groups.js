// Seeder script to assign initial staff accounts to the CUSTOMER_SERVICE_AGENT group

export default {
  async up(queryInterface) {
    const { INITIAL_STAFF_1_EMAIL, INITIAL_STAFF_2_EMAIL } = process.env;

    const staffEmails = [INITIAL_STAFF_1_EMAIL, INITIAL_STAFF_2_EMAIL];

    // Validate required environment variables
    if (staffEmails.some((email) => !email?.trim())) {
      throw new Error(
        "Both initial staff email addresses must be configured before running the user groups seeder.",
      );
    }

    if (INITIAL_STAFF_1_EMAIL === INITIAL_STAFF_2_EMAIL) {
      throw new Error("Initial staff email addresses must be different.");
    }

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
        "Both initial staff accounts must exist before assigning them to a group.",
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

    // Prevent duplicate group assignments
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

    if (existingAssignments.length > 0) {
      throw new Error(
        "One or more initial staff accounts are already assigned to the CUSTOMER_SERVICE_AGENT group.",
      );
    }

    const now = new Date();

    await queryInterface.bulkInsert(
      "user_groups",
      users.map((user) => ({
        user_id: user.id,
        group_id: customerServiceGroup.id,
        created_at: now,
        updated_at: now,
      })),
    );
  },

  async down(queryInterface) {
    const staffEmails = [
      process.env.INITIAL_STAFF_1_EMAIL,
      process.env.INITIAL_STAFF_2_EMAIL,
    ];

    if (staffEmails.some((email) => !email?.trim())) {
      throw new Error(
        "Both initial staff email addresses must be configured before reverting the user groups seeder.",
      );
    }

    const [users] = await queryInterface.sequelize.query(
      `SELECT id
       FROM users
       WHERE email IN (:staffEmails)`,
      {
        replacements: { staffEmails },
      },
    );

    if (users.length === 0) return;

    const userIds = users.map((user) => user.id);

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
      user_id: userIds,
      group_id: groups[0].id,
    });
  },
};
