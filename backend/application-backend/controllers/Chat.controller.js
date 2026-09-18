 import SessionService from '../services/ExpressSessionService.js';
 import ChatService from '../services/ChatService.js';
 const sendchatQuery = async (req, res) => {
   const { query } = req.body;
   const {userId, userPermissions:permissions} = req.user
   const sessionId = req.sessionID;

   //const conversationContext = req.session.conversationContext ?? [];
   const createdQuery =await ChatService.createChatQuery(userId, query,sessionId);
   const result = await ChatService.sendChatQuery(createdQuery.question,permissions)

   
   res.status(200).json(result);
 };

 const getChats = async (req, res) => {
    res.status(200).json({ message: "Chats retrieved successfully" });
 };

 export { sendchatQuery, getChats };