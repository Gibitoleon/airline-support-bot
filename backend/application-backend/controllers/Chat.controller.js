 import SessionService from '../services/ExpressSessionService.js';
 import ChatService from '../services/ChatService.js';
 const sendchatQuery = async (req, res) => {
   const { query } = req.body;
   const userId = req.user.userId;
   const sessionId = req.sessionID;
   const conversationContext = req.session.conversationContext ?? [];
   const createdQuery =await ChatService.createChatQuery(userId, query,sessionId);
   const {response} = await ChatService.sendChatQuery(createdQuery.question)
   
   res.status(200).json({ message: "Chat query sent successfully", query:createdQuery.question, response });
 };

 const getChats = async (req, res) => {
    res.status(200).json({ message: "Chats retrieved successfully" });
 };

 export { sendchatQuery, getChats };