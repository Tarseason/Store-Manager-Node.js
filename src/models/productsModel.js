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
  return product;
};

const addProduct = async (name) => {
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

const updateProducts = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
};

const deleteProduct = async (id) => {
  const isDelete = await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return isDelete;
};

module.exports = {
  getAll,
  getProductById,
  addProduct,
  deleteProduct,
  updateProducts,
};