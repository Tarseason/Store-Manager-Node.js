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

const deleteProduct = async (id) => {
  const isDelete = await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return isDelete;
};

const updateProducts = async (id, product) => {
  const { name } = product;
  const isFound = await getProductById(id);
  if (isFound.message) return { message: 'Product not found' };
  const query = 'UPDATE StoreManager.products SET name = ?';
  const updated = await connection.execute(query, [name]);

  return updated;
};

module.exports = {
  getAll,
  getProductById,
  addProduct,
  deleteProduct,
  updateProducts,
};