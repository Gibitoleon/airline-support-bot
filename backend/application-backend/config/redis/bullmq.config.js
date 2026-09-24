// bullmq.config.js
import "dotenv/config";

const connection = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: "default",
    password: process.env.REDIS_PASSWORD
};

export default connection;