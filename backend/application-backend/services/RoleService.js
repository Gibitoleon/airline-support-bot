import db from "../models/index.js";

const { Role } = db;

export default class RoleService {

    static async getRoleByName(roleName) {
        return await Role.findOne({
            where: {
                name: roleName
            }
        });
    }

}