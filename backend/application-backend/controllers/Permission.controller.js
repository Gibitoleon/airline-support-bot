import { StatusCodes } from "http-status-codes";

import PermissionService from "../services/PermissionService.js";

const getAllPermissions = async (req, res) => {
    const permissions = await PermissionService.getAllPermissions();

    return res.status(StatusCodes.OK).json({
        permissions
    });
};

const createPermission = async (req, res) => {
    const { name } = req.body;

    const permission = await PermissionService.createPermission(
        name
    );

    return res.status(StatusCodes.CREATED).json({
        message: "Permission created successfully",
        permission
    });
};

const updatePermission = async (req, res) => {
    const { permissionId } = req.params;
    const { name } = req.body;

    const permission = await PermissionService.updatePermission(
        permissionId,
        name
    );

    return res.status(StatusCodes.OK).json({
        message: "Permission updated successfully",
        permission
    });
};

export {
    getAllPermissions,
    createPermission,
    updatePermission
};