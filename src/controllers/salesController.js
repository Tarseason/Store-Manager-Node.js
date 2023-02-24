const { salesService } = require('../services');

const getAllSales = async (req, res) => {
  const { type, message } = await salesService.findAll();
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  getAllSales,
  getSaleById,
};