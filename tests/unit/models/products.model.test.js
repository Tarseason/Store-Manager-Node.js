const { expect } = require('chai');
const sinon = require('sinon');
const {productsModel} = require('../../../src/models')
const connection = require('../../../src/models/connection')
const { allProducts } = require('./mock/products.model.mock')

describe('Testa Unidade Model de Products', function () {
  it('Recupera a lista de produtos disponiveis', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productsModel.getAll();
    
    expect(result).to.be.deep.equal(allProducts);
  })

  it('Recupera um produto especifico', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]])

    const result = await productsModel.getProductById(1);

    expect(result).to.be.deep.equal(allProducts[0])
  })

  afterEach(function () {
    sinon.restore()
  })
})