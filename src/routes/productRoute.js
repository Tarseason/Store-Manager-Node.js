const express = require('express');
const productsController = require('../controllers/productsController');
const isEntries = require('../middlewares/isEntries');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getProductById);

router.post('/', isEntries.isName, productsController.addProduct);

router.delete('/:id', productsController.deleteProduct);
module.exports = router;