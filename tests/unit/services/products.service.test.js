const { expect } = require('chai');
const sinon = require('sinon');
const {productsService} = require('../../../src/services')
const { productsModel } = require('../../../src/models')
const {
  allProducts,
  invalId,
} = require('./mock/products.service.mock')

describe('Verifica Service de Products', function () {
  it('Retorna lista de produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts)
    
    const result = await productsService.findAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts)
  })

  it('Retorna um produto especifico com sucesso', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(allProducts[0])

    const result = await productsService.getProductById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(allProducts[0])
  })

  it('Retorna um erro caso Id seja invalido| id !== number ', async function () {
    const result = await productsService.getProductById('0')

    expect(result.type).to.equal('INVALID_VALUE')
    expect(result.message).to.equal('"id" must be a number')
  })

  it('Retorna um erro caso nao exista o produto referente ao id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);

    const result = await productsService.getProductById(1);

    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found')
  })

  afterEach(function () {
    sinon.restore()
  })
})