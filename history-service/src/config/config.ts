import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3001,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'history_db',
    },
    logLevel: process.env.LOG_LEVEL || 'info'
};