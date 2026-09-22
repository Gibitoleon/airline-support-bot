"use strict";

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("user_invitations", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false
            },

            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "roles",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            },

            token_hash: {
                type: Sequelize.STRING,
                allowNull: false
            },

            expires_at: {
                type: Sequelize.DATE,
                allowNull: false
            },

            status: {
                type: Sequelize.ENUM("PENDING", "ACCEPTED"),
                allowNull: false,
                defaultValue: "PENDING"
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
        await queryInterface.dropTable("user_invitations");

        
    }
};