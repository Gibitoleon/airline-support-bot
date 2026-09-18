import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Role = sequelize.define(
        "Role",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            name: {
                type: DataTypes.ENUM(
                    "STAFF",
                    "KNOWLEDGE_BASE_ADMIN"
                ),
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "roles",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    Role.associate = (models) => {
        Role.hasMany(models.User, {
            foreignKey: "role_id",
            as: "users"
        });
    };

    return Role;
};