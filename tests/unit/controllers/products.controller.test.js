const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai)

const { productsService } = require('../../../src/services')
const { productsController } = require('../../../src/controllers')
const {
  allProducts,
  newProductMock,
} = require('./mock/products.controller.mock')

describe('Teste de unidade do productsController', function () {
  it('GET - Retorno de sucesso | status 200 e produtos', async function () {
    const res = {}
    const req = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findAll')
      .resolves({ type: null, message: allProducts })
    
    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts)
  })

  it('GET - Retorno de sucesso de um produto especifico', async function () {
    const res = {};
      const req = {
        params: { id: 1 },
      };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductById')
      .resolves({ type: null, message: newProductMock })
    
    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    // expect(req.json).to.have.been.calledWith(newProductMock);
  })

  it('GET - Retorno de erro caso id invalido', async function () {
    const res = {}
    const req = {
      params: {id: 'abc'},
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductById')
      .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
    
    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: '"id" must be a number'});
  })

  it('GET - Retorno de erro caso id inexistente', async function () {
    const res = {}
    const req = {
      params: {id: 9999},
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    
    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  
  })

  it('POST - Retorno do cadastro de um novo Produto', async function () {
    const newProduct = {
    "id": 4,
    "name": "Lâmina de Ixtal"
  } 
    const res = {}
    const req = {
      body: { name: 'Lâmina de Ixtal' }
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'addProduct')
      .resolves({ type: null, message: newProduct })
    
    await productsController.addProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct)
  })

  afterEach(function () {
    sinon.restore()
  })
})