const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.post('/', stockController.create_stock);

router.get('/', stockController.get_stocks_by_filter);

router.put('/:id/increase', stockController.increase_stock);

router.put('/:id/decrease', stockController.decrease_stock);



module.exports = router;
