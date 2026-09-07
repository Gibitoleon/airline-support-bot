// Seeder script to populate the 'roles' table with initial data
export default {
    async up(queryInterface) {
        await queryInterface.bulkInsert('roles', [
            {
                name: 'STAFF',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'KNOWLEDGE_BASE_ADMIN',
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('roles', {
            name: ['STAFF', 'KNOWLEDGE_BASE_ADMIN']
        });
    }
};