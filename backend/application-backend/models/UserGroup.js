import { DataTypes } from "sequelize";

export default (sequelize) => {
    const UserGroup = sequelize.define(
        "UserGroup",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            group_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            }
        },
        {
            tableName: "user_groups",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    UserGroup.associate = (models) => {
        UserGroup.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user"
        });

        UserGroup.belongsTo(models.Group, {
            foreignKey: "group_id",
            as: "group"
        });
    };

    return UserGroup;
};