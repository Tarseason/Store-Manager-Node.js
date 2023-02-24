const allProducts = {
		"id": 1,
		"name": "Martelo de Thor"
}

newProductMock = { id: 1, ...allProducts };

module.exports = {
  allProducts,
  newProductMock,
}