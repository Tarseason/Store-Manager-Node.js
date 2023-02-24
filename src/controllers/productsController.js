const productsModels = require('../models');
const { productsService } = require('../services');

const getAll = async (req, res) => {
  const { type, message } = await productsService.findAll();
 
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.addProduct(name);
  if (type) return res.status(400).json(message);

  return res.status(201).json(message);
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