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

const salesDelete = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.salesDelete(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).end();
};

const createSales = async (req, res) => {
  const saleId = await salesService.createIdSales();
  await salesService.createSales(req.body, saleId);
  return res.status(201).send({ id: Number(saleId), itemsSold: [...req.body] });
};

const salesUpdated = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.updateSales(id, req.body);
  return res.status(200).json(result);
};

module.exports = {
  getAllSales,
  getSaleById,
  salesDelete,
  createSales,
  salesUpdated,
};