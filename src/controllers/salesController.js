const salesModel = require('../models/salesModel');

const getAllSales = async (req, res) => {
  const sales = await salesModel.getAllSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.getSaleById(id);
  if (sale.message) return res.status(404).json({ message: sale.message });
  return res.status(200).json(sale);
};

module.exports = {
  getAllSales,
  getSaleById,
};