const allSales = {
		"saleId": 2,
		"date": "2023-02-24T09:34:59.000Z",
		"productId": 3,
		"quantity": 15
}
  
const newSaleMock = {id: 2, ...allSales}

module.exports = {
  allSales,
  newSaleMock,
}