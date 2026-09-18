import { DataTypes } from "sequelize";

export default (sequelize) => {
    const GroupPermission = sequelize.define(
        "GroupPermission",
        {
            group_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            permission_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            }
        },
        {
            tableName: "group_permissions",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    GroupPermission.associate = (models) => {
        GroupPermission.belongsTo(models.Group, {
            foreignKey: "group_id",
            as: "group"
        });

        GroupPermission.belongsTo(models.Permission, {
            foreignKey: "permission_id",
            as: "permission"
        });
    };

    return GroupPermission;
};