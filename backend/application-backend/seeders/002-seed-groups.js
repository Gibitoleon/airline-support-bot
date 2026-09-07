// Seeder script to populate the 'groups' table with initial data
export default {
    async up(queryInterface) {
        await queryInterface.bulkInsert('groups', [
            {
                name: 'CUSTOMER_SERVICE_AGENT',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'HR',
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('groups', {
            name: ['CUSTOMER_SERVICE_AGENT', 'HR']
        });
    }
};