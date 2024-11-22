const { Product } = require('../models');
const axios = require('axios');

exports.create_product = async (req, res) => {
    try {
        console.log(req.body);
        const product = await Product.create(req.body);
        await axios.post(`${process.env.HISTORY_SERVICE}/events`, {
            product_id: product.id,
            action: 'CREATE_PRODUCT'
        });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.get_products_by_filtres = async (req, res) => {
    const { name, plu } = req.query;
    
    try {
        const where = {};
        if (name) where.name = { [Op.iLike]: `%${name}%` };
        if (plu) where.plu = plu;

        const products = await Product.findAll({ where });
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}