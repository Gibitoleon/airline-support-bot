import { DataTypes } from "sequelize";
export default (sequelize) => {
    const Feedback = sequelize.define(
        "Feedback",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            query_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            rating: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            comment: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            tableName: "feedback",
            underscored: true,
            timestamps: true
        }
    );

    Feedback.associate = (models) => {
        Feedback.belongsTo(models.Query, {
            foreignKey: "query_id",
            as: "query"
        });
    };

    return Feedback;
};