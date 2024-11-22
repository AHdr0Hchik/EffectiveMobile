// history-service/src/app.ts
import express from 'express';
import { Sequelize, Op } from 'sequelize';
import { validateEvent } from './middlewares/validator';
import { errorHandler, AppError } from './middlewares/error-handler';
import logger from './utils/logger';
import config from './config/config';
import initEventModel, { Event } from './models/Event';

const app = express();
app.use(express.json());

// Инициализация Sequelize
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    logging: (msg) => logger.debug(msg)
});

// Инициализация моделей
const EventModel = initEventModel(sequelize);

// Создание события
app.post('/events', validateEvent, async (req, res, next) => {
    try {
        const event = await EventModel.create(req.body);
        logger.info(`Event created: ${event.id}`);
        res.json(event);
    } catch (error: any) {
        next(new AppError(400, error.message));
    }
});

// Получение истории по дате
app.get('/events/date', async (req, res, next) => {
    try {
        const limit = Math.min(Math.max(1, parseInt(req.query.limit as string) || 10), 100);
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const offset = (page - 1) * limit;

        const where: any = {};

        if (req.query.start_date || req.query.end_date) {
            where.created_at = {};
            
            if (req.query.start_date) {
                where.created_at[Op.gte] = new Date(req.query.start_date as string);
            }
            
            if (req.query.end_date) {
                where.created_at[Op.lte] = new Date(req.query.end_date as string);
            }
        }

        const { count, rows: events } = await EventModel.findAndCountAll({
            where,
            order: [['created_at', 'DESC']],
            limit,
            offset
        });

        res.json({
            events,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        });

    } catch (error: any) {
        next(new AppError(400, error.message));
    }
});

// Получение истории по действию
app.get('/events/action', async (req, res, next) => {
    try {
        const limit = Math.min(Math.max(1, parseInt(req.query.limit as string) || 10), 100);
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const offset = (page - 1) * limit;

        const where: any = {};

        if (req.query.action) {
            const actions = Array.isArray(req.query.action) 
                ? req.query.action 
                : [req.query.action];
            where.action = {
                [Op.in]: actions
            };
        }

        const { count, rows: events } = await EventModel.findAndCountAll({
            where,
            order: [['created_at', 'DESC']],
            limit,
            offset
        });

        res.json({
            events,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        });

    } catch (error: any) {
        next(new AppError(400, error.message));
    }
});

// Получение истории по продукту
app.get('/events/product/:productId', async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;  // По умолчанию 10 записей
        const page = parseInt(req.query.page as string) || 1;     // По умолчанию первая страница
        const offset = (page - 1) * limit;

        const { count, rows: events } = await EventModel.findAndCountAll({
            where: { product_id: req.params.productId },
            order: [['created_at', 'DESC']],
            limit,
            offset
        });

        res.json({
            events,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error: any) {
        next(new AppError(400, error.message));
    }
});

// Получение истории по магазину
app.get('/events/shop/:shopId', async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;  // По умолчанию 10 записей
        const page = parseInt(req.query.page as string) || 1;     // По умолчанию первая страница
        const offset = (page - 1) * limit;

        const { count, rows: events } = await EventModel.findAndCountAll({
            where: { shop_id: req.params.shopId },
            order: [['created_at', 'DESC']],
            limit,
            offset
        });
        res.json({
            events,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error: any) {
        next(new AppError(400, error.message));
    }
});

app.use(errorHandler);

// Подключение к базе данных и запуск сервера
sequelize.authenticate()
    .then(() => {
        logger.info('Connected to database');
        app.listen(config.port, () => {
            logger.info(`History service is running on port ${config.port}`);
        });
    })
    .catch((error: any) => {
        logger.error('Unable to connect to database:', error);
        process.exit(1);
    });