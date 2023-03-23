const express = require('express');
const salesController = require('../controllers/salesController');
const isValidSales = require('../middlewares/isValidSale');
const isValidProductId = require('../middlewares/isValidProductId');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.delete('/:id', salesController.salesDelete);
router.post('/', isValidSales, isValidProductId, salesController.createSales);

module.exports = router;