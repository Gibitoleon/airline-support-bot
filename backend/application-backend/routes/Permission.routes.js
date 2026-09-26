import express from "express";

import {
    getAllPermissions,
    createPermission,
    updatePermission
} from "../controllers/Permission.controller.js";

const router = express.Router();

router.get("/getpermissions", getAllPermissions);

router.post("/createpermission", createPermission);

router.patch("/updatepermission/:permissionId", updatePermission);

export default router;