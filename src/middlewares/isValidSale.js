module.exports = async (req, res, next) => {
const products = req.body;
if (products.find((item) => !item.productId)) {
return res.status(400).json({ message: '"productId" is required' });
}

if (products.find((item) => item.quantity < 1)) {
return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
}

if (products.find((item) => !item.quantity)) {
return res.status(400).json({ message: '"quantity" is required' });
}

next();
}; 