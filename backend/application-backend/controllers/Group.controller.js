import GroupService from "../services/GroupService.js";
import { StatusCodes } from "http-status-codes";

const getAllGroups = async (req, res) => {
    const groups = await GroupService.getAllGroups();

    return res.status(StatusCodes.OK).json({
        groups
    });
};

const createGroup = async (req, res) => {
    const { name } = req.body;

    const group = await GroupService.createGroup(name);

    return res.status(StatusCodes.CREATED).json({
        message: "Group created successfully",
        group
    });
};

const updateGroup = async (req, res) => {
    const { groupId } = req.params;
    const { name } = req.body;

    const group = await GroupService.updateGroup(
        groupId,
        name
    );

    return res.status(StatusCodes.OK).json({
        message: "Group updated successfully",
        group
    });
};

export {
    getAllGroups,
    createGroup,
    updateGroup
};
