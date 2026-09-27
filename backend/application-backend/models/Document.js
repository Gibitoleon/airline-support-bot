import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Document = sequelize.define(
        "Document",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            document_id: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false
            },

            origin: {
                type: DataTypes.STRING,
                allowNull: false
            },

            domain: {
                type: DataTypes.STRING,
                allowNull: false
            },

            category: {
                type: DataTypes.STRING,
                allowNull: false
            },

            document_type: {
                type: DataTypes.STRING,
                allowNull: false
            },

            applicable_to: {
                type: DataTypes.JSONB,
                allowNull: false
            },

            access: {
                type: DataTypes.STRING,
                allowNull: false
            },

            status: {
                type: DataTypes.STRING,
                allowNull: false
            },

            language: {
                type: DataTypes.STRING,
                allowNull: false
            },

            file_name: {
                type: DataTypes.STRING,
                allowNull: false
            },

           file_path: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: "documents",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return Document;
};