import express from "express";

import {
    getUserGroups,
    addUserToGroup,
    removeUserFromGroup,
    getGroupUsers
} from "../controllers/User_Group.controller.js";

const router = express.Router();

router.get(
    "/user/:userId/groups",
    getUserGroups
);

router.post(
    "/user/:userId/groups",
    addUserToGroup
);

router.delete(
    "/user/:userId/groups/:groupId",
    removeUserFromGroup
);

router.get(
    "/group/:groupId/users",
    getGroupUsers
);

export default router;