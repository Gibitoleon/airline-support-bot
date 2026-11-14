import bcrypt from "bcrypt";

export default {
  async up(queryInterface) {
    // Local dummy account details
    const INITIAL_ACCOUNT_PASSWORD = "LocalKQ123!";

    const INITIAL_STAFF_1_EMAIL = "staff1.local@example.test";
    const INITIAL_STAFF_2_EMAIL = "staff2.local@example.test";
    const INITIAL_ADMIN_EMAIL = "kba.local@example.test";

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

    const existingEmails = new Set(
      existingUsers.map((user) => user.email.toLowerCase()),
    );

    const newAccounts = accounts.filter(
      (account) => !existingEmails.has(account.email.toLowerCase()),
    );

    if (newAccounts.length === 0) {
      console.log("All initial dummy accounts already exist.");
      return;
    }

    const now = new Date();

    await queryInterface.bulkInsert(
      "users",
      newAccounts.map((account) => ({
        ...account,
        password_hash: passwordHash,
        created_at: now,
        updated_at: now,
      })),
    );

    console.log(`Created ${newAccounts.length} dummy account(s).`);
  },

  async down(queryInterface) {
    const emails = [
      "staff1.local@example.test",
      "staff2.local@example.test",
      "kba.local@example.test",
    ];

    await queryInterface.bulkDelete("users", {
      email: emails,
    });
  },
};
