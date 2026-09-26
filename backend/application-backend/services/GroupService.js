import NotFoundError from "../errors/NotFounderror.js";
import db from "../models/index.js";


const { Group } = db;

export default class GroupService {

    static async createGroup(name) {
        return await Group.create({
            name
        });
    }

    static async getAllGroups() {
        return await Group.findAll({
            order: [["name", "ASC"]]
        });
    }

    static async getGroupById(groupId) {
        const group = await Group.findByPk(groupId);

        if (!group) {
            throw new NotFoundError("Group not found");
        }

        return group;
    }
    
    static async updateGroup(groupId, name) {
        const group = await Group.findByPk(groupId);

        if (!group) {
            throw new NotFoundError("Group not found");
        }

        return await group.update({
            name
        });
    }
}