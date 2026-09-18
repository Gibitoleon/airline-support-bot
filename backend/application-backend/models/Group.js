import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Group = sequelize.define(
        "Group",
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
            tableName: "groups",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    Group.associate = (models) => {
        Group.belongsToMany(models.Permission, {
            through: models.GroupPermission,
            foreignKey: "group_id",
            otherKey: "permission_id",
            as: "permissions"
        });
    };

    return Group;
};