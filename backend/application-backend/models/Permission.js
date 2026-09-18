import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Permission = sequelize.define(
        "Permission",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "permissions",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    Permission.associate = (models) => {
        Permission.belongsToMany(models.Group, {
            through: models.GroupPermission,
            foreignKey: "permission_id",
            otherKey: "group_id",
            as: "groups"
        });
    };

    return Permission;
};