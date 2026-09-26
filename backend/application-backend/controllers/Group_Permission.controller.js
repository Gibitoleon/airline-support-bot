import { StatusCodes } from "http-status-codes";

import GroupPermissionService from "../services/Group_Permission_Service.js";

const getGroupPermissions = async (req, res) => {
    const { groupId } = req.params;

    const permissions =
        await GroupPermissionService.getGroupPermissions(groupId);

    return res.status(StatusCodes.OK).json({
        permissions
    });
};

const addPermissionToGroup = async (req, res) => {
    const { groupId } = req.params;
    const { permissionId } = req.body;

    const groupPermission =
        await GroupPermissionService.addPermissionToGroup(
            groupId,
            permissionId
        );

    return res.status(StatusCodes.CREATED).json({
        message: "Permission assigned to group successfully",
        groupPermission
    });
};

const removePermissionFromGroup = async (req, res) => {
    const { groupId, permissionId } = req.params;

    await GroupPermissionService.removePermissionFromGroup(
        groupId,
        permissionId
    );

    return res.status(StatusCodes.OK).json({
        message: "Permission removed from group successfully"
    });
};

export {
    getGroupPermissions,
    addPermissionToGroup,
    removePermissionFromGroup
};