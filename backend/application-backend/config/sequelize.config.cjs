require('dotenv').config();

// different configurations for different environments (development, test, production)
// load environment variables from .env file
module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres'
    },

    test: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres'
    },

    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres'
    }
};