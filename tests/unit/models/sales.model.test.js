const { expect } = require('chai');
const sinon = require('sinon');
const {salesModel} = require('../../../src/models')
const connection = require('../../../src/models/connection')
const { allSales } = require('./mock/sales.model.mock')

describe('Testa Unidade Model de Sales', function () {
  it('Recupera todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await salesModel.getAllSales();
    
    expect(result).to.be.deep.equal(allSales);
  })

  it('Recupera uma venda especifia', async function () {
    sinon.stub(connection, 'execute').resolves([[allSales[2]]])

    const [result] = await salesModel.getSaleById(2);

    expect(result.saleId).to.be.deep.equal(allSales[2].saleId)
  })

  afterEach(function () {
    sinon.restore()
  })
})