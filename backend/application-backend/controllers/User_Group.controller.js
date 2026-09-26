import { StatusCodes } from "http-status-codes";

import UserGroupService from "../services/User_Group_Service.js";

const getUserGroups = async (req, res) => {
    const { userId } = req.params;

    const groups = await UserGroupService.getUserGroups(userId);

    return res.status(StatusCodes.OK).json({
        groups
    });
};

const addUserToGroup = async (req, res) => {
    const { userId } = req.params;
    const { groupId } = req.body;

    const userGroup = await UserGroupService.addUserToGroup(
        userId,
        groupId
    );

    return res.status(StatusCodes.CREATED).json({
        message: "User assigned to group successfully",
        userGroup
    });
};

const removeUserFromGroup = async (req, res) => {
    const { userId, groupId } = req.params;

    await UserGroupService.removeUserFromGroup(
        userId,
        groupId
    );

    return res.status(StatusCodes.OK).json({
        message: "User removed from group successfully"
    });
};

const getGroupUsers = async (req, res) => {
    const { groupId } = req.params;

    const users = await UserGroupService.getGroupUsers(groupId);

    return res.status(StatusCodes.OK).json({
        users
    });
};

export {
    getUserGroups,
    addUserToGroup,
    removeUserFromGroup,
    getGroupUsers
};