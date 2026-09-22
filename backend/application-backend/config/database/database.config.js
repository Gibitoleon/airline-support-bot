import "dotenv/config";
import { Sequelize } from "sequelize";
// Load environment variables from .env file
// Create a new Sequelize instance using the DATABASE_URL from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false
});

export default sequelize;