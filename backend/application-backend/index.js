import 'dotenv/config';
import express from 'express';
import db from './models/index.js'; 
import redisClient from './redis/redis.config.js';
import sessionService from './services/ExpressSessionService.js';
import authRoutes from './routes/Auth.routes.js';  
import chatRoutes from './routes/Chat.routes.js';
import errorHandler from "./middleware/errorhandler.js";
import  {getSessionData} from "./middleware/Session.middleware.js";

const app = express();
const port = process.env.PORT || 3000;

 //express json -
app.use(express.json());

// middleware for session management using Redis
app.use(sessionService.createSessionMiddleware(redisClient));

//authenitcation routes
app.use('/api/v1/auth', authRoutes); 


//chat routes
app.use('/api/v1/chat', getSessionData, chatRoutes);

app.use(errorHandler); // global error handler

// server startup function to ensure Redis and database connections are established before starting the server
async function startServer() {
    try {

        // Test Redis connection
        await redisClient.connect();

       console.log('Redis connected successfully');
        // Test database connection
        await db.sequelize.authenticate();

        console.log('Database connected successfully');

        // Only start Express after redis and  DB connection succeeds
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
}

startServer();