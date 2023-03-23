const { salesModel } = require('../models');
const schema = require('./validations/validateProducts');

const findAll = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const sale = await salesModel.getSaleById(id);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const salesDelete = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const isFound = await salesModel.getSaleById(id);
  if (isFound.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await salesModel.salesDelete(id);
  return { type: null, message: '' };
};

const createIdSales = async () => {
  const result = await salesModel.createIdSales();
  return result;
};

const createSales = async (product, saleId) => {
  const result = await product.map((item) => salesModel.createSales(item, saleId));
  await Promise.all(result);
  return saleId;
};

module.exports = {
  findAll,
  getSaleById,
  salesDelete,
  createIdSales,
  createSales,
};