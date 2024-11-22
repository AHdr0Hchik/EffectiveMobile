import config from './config';

export default {
    development: {
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        host: config.database.host,
        dialect: 'postgres'
    },
    production: {
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        host: config.database.host,
        dialect: 'postgres'
    }
};