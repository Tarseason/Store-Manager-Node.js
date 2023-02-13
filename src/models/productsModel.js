const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
  'SELECT * FROM StoreManager.products',
  );
   return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  if (!product) return { message: 'Product not found' };
  return product;
};

module.exports = {
  getAll,
  getProductById,
};