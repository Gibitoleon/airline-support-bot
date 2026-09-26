import db from "../models/index.js";
import BadRequestError from "../errors/BadRequesterror.js";
import NotFoundError from "../errors/NotFounderror.js";

import UserService from "./UserService.js";
import GroupService from "./GroupService.js";

const { UserGroup, Group, User } = db;

export default class UserGroupService {

    static async getUserGroups(userId) {
        await UserService.getUserById(userId);

        return await UserGroup.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: Group,
                    as: "group"
                }
            ]
        });
    }

    static async addUserToGroup(userId, groupId) {
        await UserService.getUserById(userId);

        await GroupService.getGroupById(groupId);

        const existingUserGroup = await UserGroup.findOne({
            where: {
                user_id: userId,
                group_id: groupId
            }
        });

        if (existingUserGroup) {
            throw new BadRequestError(
                "User is already assigned to this group"
            );
        }

        return await UserGroup.create({
            user_id: userId,
            group_id: groupId
        });
    }

    static async removeUserFromGroup(userId, groupId) {
        const userGroup = await UserGroup.findOne({
            where: {
                user_id: userId,
                group_id: groupId
            }
        });

        if (!userGroup) {
            throw new NotFoundError(
                "User is not assigned to this group"
            );
        }

        await userGroup.destroy();
    }

    static async getGroupUsers(groupId) {
        await GroupService.getGroupById(groupId);

        return await UserGroup.findAll({
            where: {
                group_id: groupId
            },
            include: [
                {
                    model: User,
                    as: "user"
                }
            ]
        });
    }
}