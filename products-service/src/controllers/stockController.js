const { Stock, Product } = require('../models');
const axios = require('axios');

exports.create_stock = async (req, res) => {
    try {
        const stock = await Stock.create(req.body);
        await axios.post(`${process.env.HISTORY_SERVICE}/events`, {
            product_id: stock.product_id,
            shop_id: stock.shop_id,
            action: 'CREATE_STOCK',
            qty: stock.shelf_qty
        });
        res.json(stock);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

exports.increase_stock = async (req, res) => {
    try {
        const { qty } = req.body;
        if (!qty || qty <= 0) return res.status(400).json('Некорректное количество');

        const stock = await Stock.findByPk(req.params.id);
        if (!stock) return res.status(404).json('Остаток не найден');
        
        await stock.increment('shelf_qty', { by: qty });
        await axios.post(`${process.env.HISTORY_SERVICE}/events`, {
            product_id: stock.product_id,
            shop_id: stock.shop_id,
            action: 'INCREASE_STOCK',
            qty
        });
        res.json(await stock.reload());
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.decrease_stock = async (req, res) => {
    try {
        const { qty } = req.body;
        if (!qty || qty <= 0) return res.status(400).json('Некорректное количество');

        const stock = await Stock.findByPk(req.params.id);
        if (!stock) return res.status(404).json('Остаток не найден');
        
        if (stock.shelf_qty < qty) {
            return res.status(400).json('Недостаточное количество на складе');
        }

        await stock.decrement('shelf_qty', { by: qty });
        await axios.post(`${process.env.HISTORY_SERVICE}/events`, {
            product_id: stock.product_id,
            shop_id: stock.shop_id,
            action: 'DECREASE_STOCK',
            qty
        });
        res.json(await stock.reload());
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.get_stocks_by_filter = async (req, res) => {
    const { 
        plu, 
        shop_id, 
        shelf_qty_from, 
        shelf_qty_to, 
        order_qty_from, 
        order_qty_to 
    } = req.query;
    
    try {
        const where = {};
        if (shop_id) where.shop_id = shop_id;
        
        if (shelf_qty_from || shelf_qty_to) {
            where.shelf_qty = {};
            if (shelf_qty_from) where.shelf_qty[Op.gte] = Number(shelf_qty_from);
            if (shelf_qty_to) where.shelf_qty[Op.lte] = Number(shelf_qty_to);
        }
        
        if (order_qty_from || order_qty_to) {
            where.order_qty = {};
            if (order_qty_from) where.order_qty[Op.gte] = Number(order_qty_from);
            if (order_qty_to) where.order_qty[Op.lte] = Number(order_qty_to);
        }

        const stocks = await Stock.findAll({
            where,
            include: [{
                model: Product,
                where: plu ? { plu } : undefined,
                attributes: ['id', 'name', 'plu']
            }]
        });
        res.json(stocks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}