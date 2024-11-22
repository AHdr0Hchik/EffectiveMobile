import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateEvent = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        product_id: Joi.number().required(),
        shop_id: Joi.number(),
        action: Joi.string().required().max(50),
        qty: Joi.number()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};