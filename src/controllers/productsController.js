const productsModels = require('../models/productsModel');

const getAll = async (req, res) => {
  const products = await productsModels.getAll();
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsModels.getProductById(id);
  if (product.message) return res.status(404).json({ message: product.message });
  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getProductById,
};