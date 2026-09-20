import app from './app.js';
import 'dotenv/config';
import db from '../models/index.js'; 
import redisClient from '../redis/redis.config.js';


const port = process.env.PORT || 3000;

 

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