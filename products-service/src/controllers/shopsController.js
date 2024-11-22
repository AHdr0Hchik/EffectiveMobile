const { Shop } = require('../models');

exports.create_shop = async (req, res) => {
    try {
        const shop = await Shop.create(req.body);
        res.json(shop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}