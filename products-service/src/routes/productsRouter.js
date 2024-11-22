const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/', productsController.create_product);

router.get('/', productsController.get_products_by_filtres);

module.exports = router;
