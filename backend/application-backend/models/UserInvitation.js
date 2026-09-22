export default (sequelize, DataTypes) => {
    const UserInvitation = sequelize.define(
        "UserInvitation",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false
            },

            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            token_hash: {
                type: DataTypes.STRING,
                allowNull: false
            },

            expires_at: {
                type: DataTypes.DATE,
                allowNull: false
            },

            status: {
                type: DataTypes.ENUM("PENDING", "ACCEPTED"),
                allowNull: false,
                defaultValue: "PENDING"
            }
        },
        {
            tableName: "user_invitations",
            underscored: true,
            timestamps: true
        }
    );

    // An invitation belongs to the role that the invited
    // staff member will receive after accepting it.
    UserInvitation.associate = (models) => {
        UserInvitation.belongsTo(models.Role, {
            foreignKey: "role_id",
            as: "role"
        });
    };

    return UserInvitation;
};