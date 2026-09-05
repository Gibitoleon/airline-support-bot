import 'dotenv/config';
import express from 'express';
import sequelize from './database/database.config.js';

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
    try {
        // Test database connection
        await sequelize.authenticate();

        console.log('Database connected successfully');

        // Only start Express after DB connection succeeds
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

startServer();