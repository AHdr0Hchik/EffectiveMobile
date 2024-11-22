const express = require('express');
const shopsController = require('../controllers/shopsController');

const router = express.Router();

router.post('/', shopsController.create_shop);

module.exports = router;
