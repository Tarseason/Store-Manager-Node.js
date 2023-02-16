const { expect } = require('chai')
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel')
const connection = require('../../../src/models/connection');
const salesMock = require('../../mock/salesMock');

describe('Testa camada Model de sales Rota GET', function () {
  it('Testa retorno de todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.sales]);
    const result = await salesModel.getAllSales();
    expect(result).to.deep.equal(salesMock.sales)
  })
  it('Testa retorno da busca feita por ID', async function () {
    sinon.stub(connection, 'execute').resolves([[salesMock.sales[0]]]);
    const result = await salesModel.getSaleById(3)
    expect(result).to.deep.equal([salesMock.sales[0]])
  })

  afterEach(function () {
    sinon.restore();
  });
})