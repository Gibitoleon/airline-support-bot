import db from "../models/index.js";
import NotFoundError from "../errors/NotFounderror.js";

const { User, Role , sequelize , Group} = db;

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
      "created_at",
      [
        sequelize.cast(
          sequelize.fn("COUNT", sequelize.col("groups.id")),
          "INTEGER"
        ),
        "groupCount",
      ],
    ],
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
        where: { name: "STAFF" },
      },
      {
        model: Group,
        as: "groups",
        attributes: [],
        through: { attributes: [] },
        required: false,
      },
    ],
    group: ["User.id", "role.id"],
    subQuery: false,
  });
}

}