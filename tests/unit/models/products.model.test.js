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

  it('Adiciona novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[3]]]);

    const result = await productsModel.addProduct({name:'Lâmina de Ixtal'})

    expect(result).to.be.deep.equal({id: 4, name:'Lâmina de Ixtal'});
  })

  afterEach(function () {
    sinon.restore()
  })
})