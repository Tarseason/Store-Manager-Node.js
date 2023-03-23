const connection = require('./connection');

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

module.exports = {
  getAllSales,
  getSaleById,
  salesDelete,
};