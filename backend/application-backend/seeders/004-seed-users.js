// Seeder script to populate the 'users' table with initial data
import bcrypt from "bcrypt";

export default {
  async up(queryInterface) {
    const {
      INITIAL_ACCOUNT_PASSWORD,
      INITIAL_STAFF_1_EMAIL,
      INITIAL_STAFF_2_EMAIL,
      INITIAL_ADMIN_EMAIL,
    } = process.env;

    // Validate required environment variables
    const requiredVariables = {
      INITIAL_ACCOUNT_PASSWORD,
      INITIAL_STAFF_1_EMAIL,
      INITIAL_STAFF_2_EMAIL,
      INITIAL_ADMIN_EMAIL,
    };

    for (const [key, value] of Object.entries(requiredVariables)) {
      if (!value?.trim()) {
        throw new Error(
          `${key} must be configured before running the users seeder.`,
        );
      }
    }

    // Hash the shared initial password
    const passwordHash = await bcrypt.hash(INITIAL_ACCOUNT_PASSWORD, 10);

    // Retrieve the required roles
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id, name
       FROM roles
       WHERE name IN (:roleNames)`,
      {
        replacements: {
          roleNames: ["STAFF", "KNOWLEDGE_BASE_ADMIN"],
        },
      },
    );

    const staffRole = roles.find((role) => role.name === "STAFF");
    const adminRole = roles.find(
      (role) => role.name === "KNOWLEDGE_BASE_ADMIN",
    );

    if (!staffRole || !adminRole) {
      throw new Error(
        "Required STAFF or KNOWLEDGE_BASE_ADMIN role was not found.",
      );
    }

    const accounts = [
      {
        role_id: staffRole.id,
        email: INITIAL_STAFF_1_EMAIL,
      },
      {
        role_id: staffRole.id,
        email: INITIAL_STAFF_2_EMAIL,
      },
      {
        role_id: adminRole.id,
        email: INITIAL_ADMIN_EMAIL,
      },
    ];

    // Check for existing accounts to prevent duplicate insertion
    const [existingUsers] = await queryInterface.sequelize.query(
      `SELECT email
       FROM users
       WHERE email IN (:emails)`,
      {
        replacements: {
          emails: accounts.map((account) => account.email),
        },
      },
    );

    if (existingUsers.length > 0) {
      throw new Error(
        `Some initial accounts already exist: ${existingUsers
          .map((user) => user.email)
          .join(", ")}. No accounts were inserted.`,
      );
    }

    const now = new Date();

    await queryInterface.bulkInsert(
      "users",
      accounts.map((account) => ({
        ...account,
        password_hash: passwordHash,
        created_at: now,
        updated_at: now,
      })),
    );
  },

  async down(queryInterface) {
    const emails = [
      process.env.INITIAL_STAFF_1_EMAIL,
      process.env.INITIAL_STAFF_2_EMAIL,
      process.env.INITIAL_ADMIN_EMAIL,
    ];

    if (emails.some((email) => !email?.trim())) {
      throw new Error(
        "Initial account emails must be configured before reverting the users seeder.",
      );
    }

    await queryInterface.bulkDelete("users", {
      email: emails,
    });
  },
};
