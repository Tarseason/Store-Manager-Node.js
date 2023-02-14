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

const addProduct = async (product) => {
  const { name } = product;
  await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUES (?)',
    [name],
  );
  const [[newProduct]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
  );
  return newProduct;
};

module.exports = {
  getAll,
  getProductById,
  addProduct,
};