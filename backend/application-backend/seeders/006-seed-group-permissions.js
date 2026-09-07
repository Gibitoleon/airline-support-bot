
// Seeder script to populate the 'group_permissions' table with initial data
export default {
    async up(queryInterface) {
        const [groups] = await queryInterface.sequelize.query(`
            SELECT id, name
            FROM groups
            WHERE name IN ('CUSTOMER_SERVICE_AGENT', 'HR')
        `);

        const [permissions] = await queryInterface.sequelize.query(`
            SELECT id, name
            FROM permissions
            WHERE name IN (
                'VIEW_CUSTOMER_DOCUMENTS',
                'VIEW_CUSTOMER_SERVICE_DOCUMENTS',
                'VIEW_HR_DOCUMENTS'
            )
        `);

        const customerServiceGroup = groups.find(
            group => group.name === 'CUSTOMER_SERVICE_AGENT'
        );

        const hrGroup = groups.find(
            group => group.name === 'HR'
        );

        const customerDocumentsPermission = permissions.find(
            permission => permission.name === 'VIEW_CUSTOMER_DOCUMENTS'
        );

        const customerServiceDocumentsPermission = permissions.find(
            permission => permission.name === 'VIEW_CUSTOMER_SERVICE_DOCUMENTS'
        );

        const hrDocumentsPermission = permissions.find(
            permission => permission.name === 'VIEW_HR_DOCUMENTS'
        );

        await queryInterface.bulkInsert('group_permissions', [
            {
                group_id: customerServiceGroup.id,
                permission_id: customerDocumentsPermission.id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                group_id: customerServiceGroup.id,
                permission_id: customerServiceDocumentsPermission.id,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                group_id: hrGroup.id,
                permission_id: hrDocumentsPermission.id,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface) {
        const [groups] = await queryInterface.sequelize.query(`
            SELECT id
            FROM groups
            WHERE name IN ('CUSTOMER_SERVICE_AGENT', 'HR')
        `);

        await queryInterface.bulkDelete('group_permissions', {
            group_id: groups.map(group => group.id)
        });
    }
};

