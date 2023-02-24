const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai)

const {allSales, newSaleMock} = require('./mock/sales.controller.mock')

const { salesService } = require('../../../src/services')
const { salesController } = require('../../../src/controllers')

describe('Testa unidade do salesController', function () {
  it('GET - Retorno de sucesso | status 200 e vendas', async function () {
    const res = {}
    const req = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findAll')
      .resolves({ type: null, message: allSales })
    
    await salesController.getAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales)
  })

  it('GET - Retorno de sucesso de um venda especifica', async function () {
    const res = {};
      const req = {
        params: { id: 2 },
      };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSaleById')
      .resolves({ type: null, message: newSaleMock })
    
    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    // expect(req.json).to.have.been.calledWith(newProductMock);
  })

  it('GET - Retorno de erro caso id inexistente', async function () {
    const res = {}
    const req = {
      params: {id: 9999},
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSaleById')
      .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
    
    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Sale not found'});
  
  })

  it('GET - Retorno de erro caso id invalido', async function () {
    const res = {}
    const req = {
      params: {id: 'abc'},
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSaleById')
      .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
    
    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: '"id" must be a number'});
  })

  afterEach(function () {
    sinon.restore()
  })
})