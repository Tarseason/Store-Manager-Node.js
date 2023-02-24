const { productsModel } = require('../models');
const schema = require('./validations/validateProducts');

const findAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const products = await productsModel.getProductById(id);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: products };
};

const addProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;
  const newProductAdd = await productsModel.addProduct(name);
  const newProduct = await productsModel.getProductById(newProductAdd.id);
  return { type: null, message: newProduct };
};

const updateProducts = async (id, name) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const isFound = await productsModel.getProductById(id);
  if (!isFound) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.updateProducts(id, name);
  const productUpdated = await productsModel.getProductById(id);
  return { type: null, message: productUpdated };
};

const deleteProduct = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const isFound = await productsModel.getProductById(id);
  if (!isFound) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.deleteProduct(id);
  return { type: null, message: '' };
};

module.exports = {
  findAll,
  getProductById,
  addProduct,
  updateProducts,
  deleteProduct,
};