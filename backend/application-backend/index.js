import 'dotenv/config';
import express from 'express';
import sequelize from './database/database.config.js';
import redisClient from './redis/redis.config.js';

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
    try {

        // Test Redis connection
        await redisClient.connect();

       console.log('Redis connected successfully');
        // Test database connection
        await sequelize.authenticate();

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