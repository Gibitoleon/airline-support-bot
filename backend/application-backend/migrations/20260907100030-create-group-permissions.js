'use strict';
// Migration script to create the 'group_permissions' table in the database
export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('group_permissions', {
            group_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'groups',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            permission_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'permissions',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            }
        });

        await queryInterface.addConstraint('group_permissions', {
            fields: ['group_id', 'permission_id'],
            type: 'unique',
            name: 'unique_group_permission'
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('group_permissions');
    }
};