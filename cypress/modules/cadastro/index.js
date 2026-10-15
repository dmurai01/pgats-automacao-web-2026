function inciarCadastro(nome, email) {
    cy.get('a[href*=login]').click()

    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)

    cy.get('[data-qa="signup-button"]').click()
}

function preencherCadastro() {
    cy.get('#id_gender2').click()
    cy.get('[data-qa="password"]').type('123456')
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('February')
    cy.get('[data-qa="years"]').select('1981')

    cy.get('#optin').check()

    cy.get('[data-qa="first_name"]').type('Dani9')
    cy.get('[data-qa="last_name"]').type('Teste')

    cy.get('[data-qa="address"]').type('Endereço Teste')

    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('California')
    cy.get('[data-qa="city"]').type('San Francisco')
    cy.get('[data-qa="zipcode"]').type('12345')

    cy.get('[data-qa="mobile_number"]').type('55 11 99998888')

    cy.get('[data-qa="create-account"]').click()
}

function assersaoCadastro() {
    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain', 'Account Created!')

}

function assersaoSignupMensagemErro(mensagem) {
    cy.get('form[action*="signup"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain.text', mensagem)
}



module.exports = {
    inciarCadastro,
    preencherCadastro,
    assersaoCadastro,
    assersaoSignupMensagemErro
}