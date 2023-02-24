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

module.exports = {
  findAll,
  getSaleById,
};