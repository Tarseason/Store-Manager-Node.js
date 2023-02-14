const express = require('express');
const productsController = require('./controllers/productsController');

const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getProductById);

router.post('/products', productsController.addProduct);
module.exports = router;