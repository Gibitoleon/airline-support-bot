import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Query = sequelize.define(
        "Query",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            session_id: {
                type: DataTypes.STRING,
                allowNull: false
            },

            question: {
                type: DataTypes.TEXT,
                allowNull: false
            },

            response: {
                type: DataTypes.TEXT,
                allowNull: true
            },

            status: {
                type: DataTypes.ENUM(
                    'pending',
                    'answered',
                    'escalated'
                ),
                allowNull: false,
                defaultValue: 'pending'
            }
        },
        {
            tableName: 'queries',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    Query.associate = (models) => {
        Query.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

    return Query;
};