import db from "../models/index.js";
import NotFoundError from "../errors/NotFounderror.js";

const { Permission } = db;

export default class PermissionService {

    static async createPermission(name) {
        return await Permission.create({
            name
        });
    }

    static async getAllPermissions() {
        return await Permission.findAll({
            order: [["name", "ASC"]]
        });
    }

    static async updatePermission(permissionId, name) {
        const permission = await Permission.findByPk(permissionId);

        if (!permission) {
            throw new NotFoundError("Permission not found");
        }

        return await permission.update({
            name
        });
    }
}