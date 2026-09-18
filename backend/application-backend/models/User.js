import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },

            password_hash: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            tableName: 'users',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    User.associate = (models) => {
    
        User.belongsTo(models.Role, {
            foreignKey: "role_id",
            as: "role"
        });
        User.hasMany(models.Query, {
            foreignKey: 'user_id',
            as: 'queries'
        });
        User.belongsToMany(models.Group, {
            through: models.UserGroup,
            foreignKey: "user_id",
            otherKey: "group_id",
            as: "groups"
        });
    };

    return User;
};