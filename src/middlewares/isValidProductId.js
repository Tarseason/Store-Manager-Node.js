const { getProductById } = require('../services/products.service');

module.exports = async (req, res, next) => {
const sales = req.body;
  const produtos = await Promise.all(sales.map((item) => getProductById(item.productId)));
if (produtos.find((item) => item.type)) {
return res.status(404).send({ message: 'Product not found' });
}
next();
}; 