import db from "../models/index.js";
const { Feedback, Query } = db;
export default class FeedbackService {
    static async createFeedback(queryId, rating, comment) {
        return await Feedback.create({
            query_id: queryId,
            rating,
            comment
        });
    }
    static async getAllFeedback() {
    return await Feedback.findAll({
        include: [
            {
                model: Query,
                as: "query",
                attributes: ["id", "question", "response"]
            }
        ],
        order: [["created_at", "DESC"]]
    });
}
}