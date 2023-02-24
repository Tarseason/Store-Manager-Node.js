const { expect } = require('chai');
const sinon = require('sinon');
const {productsService} = require('../../../src/services')
const { productsModel } = require('../../../src/models')
const {
  allProducts,
} = require('./mock/products.service.mock')

describe('Verifica Service de Products', function () {
  it('GET - Retorna lista de produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts)
    
    const result = await productsService.findAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts)
  })

  it('GET - Retorna um produto especifico com sucesso', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(allProducts[0])

    const result = await productsService.getProductById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(allProducts[0])
  })

  it('GET - Retorna um erro caso Id seja invalido| id !== number ', async function () {
    const result = await productsService.getProductById('0')

    expect(result.type).to.equal('INVALID_VALUE')
    expect(result.message).to.equal('"id" must be a number')
  })

  it('GET - Retorna um erro caso nao exista o produto referente ao id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);

    const result = await productsService.getProductById(1);

    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found')
  })

  it('POST - Retorna erro caso tente cadastrar produto com nome invalido', async function () {
    const result = await productsService.addProduct('');

    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"name" length must be at least 5 characters long')
  })

  it('POST - Testa cadastro de produto com valores validos', async function () {
    sinon.stub(productsModel, 'addProduct').resolves([[allProducts[3]]])
    sinon.stub(productsModel, 'getProductById').resolves(4)

    const result = await productsService.addProduct("Lâmina de Ixtal");

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(4)
  })

  afterEach(function () {
    sinon.restore()
  })
})