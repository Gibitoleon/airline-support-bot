import 'dotenv/config';
import express from 'express';
import redisClient from '../config/redis/redis.config.js';
import sessionService from '../services/ExpressSessionService.js';
import authRoutes from '../routes/Auth.routes.js';  
import chatRoutes from '../routes/Chat.routes.js';
import feedbackRoutes from "../routes/Feedback.routes.js"
import invitationRoutes from "../routes/Invitation.routes.js"
import errorHandler from "../middleware/Errorhandler.js";
import  {getCustomerSession,getSessionData} from "../middleware/Session.middleware.js";

const app = express();

//express json 
app.use(express.json());

// middleware for session management using Redis
app.use(sessionService.createSessionMiddleware(redisClient));


//authentication routes
app.use('/api/v1/auth', authRoutes); 


//chat routes
app.use('/api/v1/chat', getCustomerSession, chatRoutes);

//feedback routes
app.use('/api/v1/feedback', getSessionData ,feedbackRoutes)

// invitation routes
app.use('/api/v1/invitation', getSessionData , invitationRoutes)

// global error handler
app.use(errorHandler); 

export default app