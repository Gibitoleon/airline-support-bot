
import db from '../models/index.js';
import { apiRequest } from "../utils/apiRequest.js";
import ForbiddenError from '../errors/Forbiddenerror.js';
import { StatusCodes } from 'http-status-codes';
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
   static async updateChatQuery(queryId, response) {
    await Query.update(
        {
            response,
            status: "answered"
        },
        {
            where: {
                id: queryId
            }
        }
    );

    return await Query.findByPk(queryId);
}
    static async sendChatQuery(query, permissions) {
    try {
        const responseData = await apiRequest({
            url: "/retrieve",
            method: "POST",
            data: {
                query,
                permissions
            },
            baseURL: process.env.RAG_SERVICE_URL
        });

        return responseData;
    } catch (error) {
            if (error.response?.status === StatusCodes.FORBIDDEN) {
                throw new ForbiddenError(
                    "Not authorized to access this info."
                );
            }

        throw error;
    }
    }
    static async getChats(userId) {}
}