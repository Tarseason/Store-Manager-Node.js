const isEntries = (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Not Found' });

  next();
};

module.exports = {
  isEntries,
};