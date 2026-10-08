import db from "../models/index.js";
import NotFoundError from "../errors/NotFounderror.js";

const { User, Role } = db;

export default class UserService {

    static async getUserById(userId) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    }

    static async getStaffUsers() {
    return await User.findAll({
        attributes: [
            "id",
            "email",
            "created_at"
        ],
        include: [
            {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
                where: {
                    name: "STAFF"
                }
            }
        ]
    });
}
}