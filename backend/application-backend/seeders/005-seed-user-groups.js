// Seeder script to populate the 'user_groups' table with initial data
export default {
  async up(queryInterface) {
    const [users] = await queryInterface.sequelize.query(`
            SELECT id, email
            FROM users
            WHERE email IN (
                '${process.env.INITIAL_STAFF_1_EMAIL}',
                '${process.env.INITIAL_STAFF_2_EMAIL}'
            )
        `);

    const [groups] = await queryInterface.sequelize.query(`
            SELECT id, name
            FROM groups
            WHERE name = 'CUSTOMER_SERVICE_AGENT'
        `);

    const customerServiceGroup = groups[0];

    await queryInterface.bulkInsert("user_groups", [
      {
        user_id: users.find(
          (user) => user.email === "${process.env.INITIAL_STAFF_1_EMAIL}",
        ).id,
        group_id: customerServiceGroup.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: users.find(
          (user) => user.email === "${process.env.INITIAL_STAFF_2_EMAIL}",
        ).id,
        group_id: customerServiceGroup.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    const [users] = await queryInterface.sequelize.query(`
            SELECT id
            FROM users
            WHERE email IN (
                '${process.env.INITIAL_STAFF_1_EMAIL}',
                '${process.env.INITIAL_STAFF_2_EMAIL}'
            )
        `);

    await queryInterface.bulkDelete("user_groups", {
      user_id: users.map((user) => user.id),
    });
  },
};
