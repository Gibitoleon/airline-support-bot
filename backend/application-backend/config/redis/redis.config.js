import "dotenv/config";
import { createClient } from 'redis';
const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
client.on('error', (err) => {
            console.error('Redis Client Error', err);
            process.exit(1);
        });
        
export default client;


