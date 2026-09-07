'use strict';

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('feedback', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            query_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'queries',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            rating: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            comment: {
                type: Sequelize.TEXT,
                allowNull: true
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
    },

    async down(queryInterface) {
        await queryInterface.dropTable('feedback');
    }
};