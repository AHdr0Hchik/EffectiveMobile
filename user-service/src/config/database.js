const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'effectivemobile-userservice'
    }
};