import db from "../models/index.js";
import NotFoundError from "../errors/NotFounderror.js";

import GroupService from "./GroupService.js";
import PermissionService from "./PermissionService.js";

const {
    GroupPermission,
    Permission
} = db;

export default class GroupPermissionService {

    static async getGroupPermissions(groupId) {
        await GroupService.getGroupById(groupId);

        return await GroupPermission.findAll({
            where: {
                group_id: groupId
            },
            include: [
                {
                    model: Permission,
                    as: "permission"
                }
            ]
        });
    }

    static async addPermissionToGroup(groupId, permissionId) {
        await GroupService.getGroupById(groupId);

        await PermissionService.getPermissionById(permissionId);

        return await GroupPermission.create({
            group_id: groupId,
            permission_id: permissionId
        });
    }

    static async removePermissionFromGroup(groupId, permissionId) {
        const groupPermission = await GroupPermission.findOne({
            where: {
                group_id: groupId,
                permission_id: permissionId
            }
        });

        if (!groupPermission) {
            throw new NotFoundError(
                "Permission is not assigned to this group"
            );
        }

        await groupPermission.destroy();
    }
}