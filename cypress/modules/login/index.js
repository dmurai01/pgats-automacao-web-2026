function preencherLogin(email, senha) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)

    cy.get('[data-qa="login-button"]').click()
}

function assersaoLoginSucesso(nome, sobrenome) {
    cy.get('a > b').should('contain', `${nome}`)
}

function assersaoLoginMensagemErro(mensagem) {
    cy.get('form[action*="login"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain.text', mensagem)
}

function efetuarLogout() {
    cy.get('a[href*="logout"]')
        .should('be.visible')
        .click()
}

function assersaoLogout() {
    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should('not.exist')
    cy.get('[action*="login"]').should('be.visible')
    cy.url().should('include', 'login')
}

module.exports = {
    preencherLogin,
    assersaoLoginSucesso,
    assersaoLoginMensagemErro,
    efetuarLogout,
    assersaoLogout
}