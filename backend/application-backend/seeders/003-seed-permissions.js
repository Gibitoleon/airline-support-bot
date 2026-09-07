// Seeder script to populate the 'permissions' table with initial data
export default {
    async up(queryInterface) {
        await queryInterface.bulkInsert('permissions', [
            {
                name: 'VIEW_CUSTOMER_DOCUMENTS',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'VIEW_CUSTOMER_SERVICE_DOCUMENTS',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'VIEW_HR_DOCUMENTS',
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('permissions', {
            name: [
                'VIEW_CUSTOMER_DOCUMENTS',
                'VIEW_CUSTOMER_SERVICE_DOCUMENTS',
                'VIEW_HR_DOCUMENTS'
            ]
        });
    }
};