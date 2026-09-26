import express from "express";

import {
    getAllGroups,
    createGroup,
    updateGroup
} from "../controllers/Group.controller.js";

const router = express.Router();

router.get("/getgroups", getAllGroups);
router.post("/creategroup", createGroup);
router.patch("/updategroup/:groupId", updateGroup);

export default router; 