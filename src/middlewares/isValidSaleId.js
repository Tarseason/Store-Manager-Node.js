const { getSaleById } = require('../services/sales.service');

module.exports = async (req, res, next) => {
const { id } = req.params;
  const checkId = await getSaleById(id);
  console.log(checkId);
if (!id || checkId.type) return res.status(404).send({ message: 'Sale not found' });
next();
}; 