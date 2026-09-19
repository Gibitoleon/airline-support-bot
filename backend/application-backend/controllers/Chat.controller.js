 import SessionService from '../services/ExpressSessionService.js';
 import ChatService from '../services/ChatService.js';
 const sendchatQuery = async (req, res) => {
   const { query } = req.body;
   const {userId, userPermissions:permissions,conversationContext} = req.user
   const sessionId = req.sessionID;

   //const conversationContext = req.session.conversationContext ?? [];
   const createdQuery =await ChatService.createChatQuery(userId, query,sessionId);
   const result = await ChatService.sendChatQuery(createdQuery.question,permissions)
   const updatedQuery = await ChatService.updateChatQuery(createdQuery.id,result.response)
   SessionService.addConversationContext(req,conversationContext,updatedQuery.question,updatedQuery.response)
   
   res.status(200).json(result);
 };

 const getChats = async (req, res) => {
    const {conversationContext} = req.user
    res.status(200).json({ message: "Chats retrieved successfully", conversationContext:conversationContext});
 };

 export { sendchatQuery, getChats };