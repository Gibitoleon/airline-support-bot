"use strict";

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("documents", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            document_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },

            title: {
                type: Sequelize.STRING,
                allowNull: false
            },

            origin: {
                type: Sequelize.STRING,
                allowNull: false
            },

            domain: {
                type: Sequelize.STRING,
                allowNull: false
            },

            category: {
                type: Sequelize.STRING,
                allowNull: false
            },

            document_type: {
                type: Sequelize.STRING,
                allowNull: false
            },

            applicable_to: {
                type: Sequelize.JSONB,
                allowNull: false
            },

            access: {
                type: Sequelize.STRING,
                allowNull: false
            },

            status: {
                type: Sequelize.STRING,
                allowNull: false
            },

            language: {
                type: Sequelize.STRING,
                allowNull: false
            },

            file_name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            file_path: {
                type: Sequelize.STRING,
                allowNull: false
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("NOW")
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("NOW")
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("documents");
    }
};