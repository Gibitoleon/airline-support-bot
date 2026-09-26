import db from "../models/index.js";
import NotFoundError from "../errors/NotFounderror.js";

const { User } = db;

export default class UserService {

    static async getUserById(userId) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    }
}