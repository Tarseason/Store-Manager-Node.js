const { expect } = require('chai')
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel')
const connection = require('../../../src/models/connection')
const mockProducts = require('../../mock/productsMock');
const {products} = mockProducts

describe('Testa Camada Model de products pelo GET', function () {
  it('Recupera a lista de produtos', async function () {
    //Arange
    sinon.stub(connection, 'execute').resolves([products])
    // Act
    const result = await productsModel.getAll();
    // Assertion
    expect(result).to.be.deep.equal(products)
  })

  it('Testa se retorna erro com ID incompativel', async function () {
    sinon.stub(connection, 'execute').resolves([[mockProducts[0]]])

    const result = await productsModel.getProductById(9999);

    expect(result).to.be.deep.equal({message: "Product not found"})
  })

  it('Testa retorno do produto com ID compativel', async function () {
    
    sinon.stub(connection, 'execute').resolves([[products[0]]])

    const result = await productsModel.getProductById(1);

    expect([result]).to.be.equal(mockProducts.products[0])
  })

  afterEach(function () {
    sinon.restore();
  });
})
