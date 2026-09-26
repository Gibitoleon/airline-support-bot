import express from "express";

import {
    getGroupPermissions,
    addPermissionToGroup,
    removePermissionFromGroup
} from "../controllers/Group_Permission.controller.js";

const router = express.Router();

router.get(
    "/:groupId/getpermissions",
    getGroupPermissions
);

router.post(
    "/:groupId/addpermission",
    addPermissionToGroup
);

router.delete(
    "/:groupId/removepermission/:permissionId",
    removePermissionFromGroup
);

export default router;