const connection = require('./connection');

const createIdSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES(NOW())',
  );
  return insertId;
};

const createSales = async (product, saleId) => {
  console.log(product);
  const { productId, quantity } = product;
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
    [saleId, productId, quantity],
  );
  return result;
};

const getAllSales = async () => {
  const query = `SELECT 
    sa.id AS saleId,
    sa.date,
    sp.product_id AS productId,
    sp.quantity
FROM
    StoreManager.sales AS sa
        INNER JOIN
    StoreManager.sales_products AS sp
ON
    sa.id = sp.sale_id`;
  const [allSales] = await connection.execute(query);
  return allSales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT 
    sa.date,
    sp.product_id AS productId,
    sp.quantity
FROM
    StoreManager.sales AS sa
        INNER JOIN
    StoreManager.sales_products AS sp
ON
    sa.id = sp.sale_id
AND 
    sa.id = ?
ORDER BY sp.sale_id ASC , product_id ASC`,
    [id],
  );
  return sale;
};

const salesDelete = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
};

const updateSales = async (id, product) => {
  console.log(product);
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  const allProducts = product.map((produ) => createSales(produ, id));
  await Promise.all(allProducts);
  const result = await getSaleById(id);
  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
  salesDelete,
  createIdSales,
  createSales,
  updateSales,
};