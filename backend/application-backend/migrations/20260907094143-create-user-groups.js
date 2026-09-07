
'use strict';

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_groups', {
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

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

        await queryInterface.addConstraint('user_groups', {
            fields: ['user_id', 'group_id'],
            type: 'unique',
            name: 'unique_user_group'
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('user_groups');
    }
};

