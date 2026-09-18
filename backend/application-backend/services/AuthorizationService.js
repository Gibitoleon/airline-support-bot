import db from "../models/index.js";

const { User, Group, Permission, Role } = db;

export default class AuthorizationService {

    // Main orchestration layer
    static async getUserAuthorization(userId) {

        const user = await this.getUserWithAuthorizationData(userId);

        if (!user) {
            return null;
        }

        const role = this.getRole(user);

        const group = this.getPrimaryGroup(user);

        const permissions = this.getPermissions(group);

        return this.buildAuthorizationContext(
            role,
            group,
            permissions
        );
    }


    // Get user + role + group + permissions
    static async getUserWithAuthorizationData(userId) {

        return User.findByPk(userId, {

            attributes: ["id"],

            include: [

                {
                    model: Role,
                    as: "role",
                    attributes: ["id", "name"]
                },

                {
                    model: Group,
                    as: "groups",

                    attributes: ["id", "name"],

                    through: {
                        attributes: []
                    },

                    include: {
                        model: Permission,
                        as: "permissions",

                        attributes: ["id", "name"],

                        through: {
                            attributes: []
                        }
                    }
                }
            ]
        });
    }


    // Get the user's role
    static getRole(user) {

        return user.role || null;
    }


    // Get the user's group
    static getPrimaryGroup(user) {

        return user.groups[0] || null;
    }


    // Extract permissions
    static getPermissions(group) {

        if (!group) {
            return [];
        }

        return group.permissions.map(permission => (
             permission.name
        ));
    }


    // Build authorization context
    static buildAuthorizationContext(
        role,
        group,
        permissions
    ) {

        return {

            role: role
                ? {
                    id: role.id,
                    name: role.name
                }
                : null,

            group: group
                ? {
                    id: group.id,
                    name: group.name
                }
                : null,

            permissions
        };
    }
}