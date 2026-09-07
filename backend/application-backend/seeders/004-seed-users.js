
'use strict';
// Seeder script to populate the 'users' table with initial data
import bcrypt from 'bcrypt';

export default {
    async up(queryInterface) {
        const passwordHash = await bcrypt.hash('DevPassword123!', 10);

        const [roles] = await queryInterface.sequelize.query(`
            SELECT id, name
            FROM roles
            WHERE name IN ('STAFF', 'KNOWLEDGE_BASE_ADMIN')
        `);

        const staffRole = roles.find(role => role.name === 'STAFF');
        const adminRole = roles.find(
            role => role.name === 'KNOWLEDGE_BASE_ADMIN'
        );

        await queryInterface.bulkInsert('users', [
            {
                role_id: staffRole.id,
                email: 'gabrielleon9928@gmail.com',
                password_hash: passwordHash,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                role_id: staffRole.id,
                email: 'gabrielleon161327@gmail.com',
                password_hash: passwordHash,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                role_id: adminRole.id,
                email: 'gabriel.otieno@strathmore.edu',
                password_hash: passwordHash,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('users', {
            email: [
                'gabrielleon9928@gmail.com',
                'gabrielleon161327@gmail.com',
                'gabriel.otieno@strathmore.edu'
            ]
        });
    }
};

