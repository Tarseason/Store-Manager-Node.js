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

const addProduct = async (req, res) => {
  const addedProduct = await productsModels.addProduct(req.body);

  return res.status(201).json(addedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const isId = await productsModels.getProductById(id);
  if (isId.message) return res.status(404).json({ message: 'Product not found' });
  await productsModels.deleteProduct(id);
  return res.status(204).end();
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updated = await productsModels.updateProducts(id, body);
  if (updated.message) return res.status(404).json({ message: updated.message });
  return res.status(200).json({ id, name: body.name });
};

module.exports = {
  getAll,
  getProductById,
  addProduct,
  deleteProduct,
  updateProducts,
};