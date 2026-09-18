import db from '../models/index.js';
import { apiRequest } from "../utils/apiRequest.js";
import "dotenv/config"

const {Query} = db

export default class ChatService {
    static async createChatQuery(userId, query,sessionId) {
        return await Query.create({
            user_id: userId,
            session_id: sessionId,
            question: query,
            status: 'pending'
        });
    }

   static async sendChatQuery(query) {
    const responseData = await apiRequest({
        url: "/retrieve",
        method: "POST",
        data: {
            query
        },
        baseURL: process.env.RAG_SERVICE_URL
    });

    return responseData;
}
    static async getChats(userId) {}
}