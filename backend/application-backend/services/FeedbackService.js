import { where } from "sequelize";
import db from "../models/index.js";
import ForbiddenError from "../errors/Forbiddenerror.js";
const { Feedback, Query } = db;
export default class FeedbackService {
  static async createFeedback(queryId, rating, comment, sessionId) {
    const query = await Query.findOne({
      where: {
        id: queryId,
        session_id: sessionId,
      },
    });
    if (!query) {
      throw new ForbiddenError("Not allowed to modify this resource");
    }
    return await Feedback.create({
      query_id: queryId,
      rating,
      comment,
    });
  }
  static async getAllFeedback() {
    return await Feedback.findAll({
      include: [
        {
          model: Query,
          as: "query",
          attributes: ["id", "question", "response"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }
}
