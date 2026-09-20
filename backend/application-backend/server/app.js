import 'dotenv/config';
import express from 'express';
import db from '../models/index.js'; 
import redisClient from '../redis/redis.config.js';
import sessionService from '../services/ExpressSessionService.js';
import authRoutes from '../routes/Auth.routes.js';  
import chatRoutes from '../routes/Chat.routes.js';
import errorHandler from "../middleware/Errorhandler.js";
import  {getSessionData} from "../middleware/Session.middleware.js";

const app = express();

//express json -
app.use(express.json());

// middleware for session management using Redis
app.use(sessionService.createSessionMiddleware(redisClient));

//authenitcation routes
app.use('/api/v1/auth', authRoutes); 


//chat routes
app.use('/api/v1/chat', getSessionData, chatRoutes);

app.use(errorHandler); // global error handler

export default app