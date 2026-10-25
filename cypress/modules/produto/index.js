function adicionarProdutoCarrinho(codigoProduto) {
    cy.get(`a[data-product-id=${codigoProduto}]`).first().click()
    cy.get('.modal-title')

    cy.get('button').contains('Continue Shopping').click()

    cy.get('.shop-menu a[href*=view_cart]').first().click()
    cy.get('#cart_items').should('be.visible')

}
// add produto no carrinho 

// checkout
function checkout(nome, sobrenome, endereco, telefone) {
    cy.contains('a', 'Proceed To Checkout').click()

    cy.get('#address_delivery').should('contain.text', `${nome}`)
        .and('contain.text', `${sobrenome}`)
        .and('contain.text', `${endereco}`)
        .and('contain.text', `${telefone}`)

    cy.get('a[href*=payment]').click()

    cy.get('[data-qa="name-on-card"]').click().type(`${nome} ${sobrenome}`)
    cy.get('[data-qa="card-number"]').click().type('123456')
    cy.get('[data-qa="cvc"]').click().type('123')
    cy.get('[data-qa="expiry-month"]').click().type('11')
    cy.get('[data-qa="expiry-year"]').click().type('2030')

    cy.get('[data-qa="pay-button"]').click()

}

//asserssao
function assersaoCheckout() {
    cy.get('p').should('contain.text', 'Congratulations! Your order has been confirmed!')
}

module.exports = {
    adicionarProdutoCarrinho,
    checkout,
    assersaoCheckout
}
