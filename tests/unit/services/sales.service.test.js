const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services')
const { salesModel } = require('../../../src/models')
const { allSales } = require('./mock/sales.service.model.mock')

describe('Verifica Servie de Sales', function () {
  it('GET - Retorna Vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSales)

    const result = await salesService.findAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allSales)
  })

  it('GET - Retorna uma venda especifica', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(allSales[2])

    const result = await salesService.getSaleById(2);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(allSales[2])
  })

  it('GET - Retorna um erro caso Id seja invalido| id !== number ', async function () {
    const result = await salesService.getSaleById('0')

    expect(result.type).to.equal('INVALID_VALUE')
    expect(result.message).to.equal('"id" must be a number')
  })
})