const cadastro = require('../../modules/cadastro/index.js')

describe('Automation Exercise', () => {
    // Cadastro

    it('Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com/')

        cy.get('a[href*=login]').click()

        cadastro.inciarCadastro(`Dani${Date.now()} Teste`, `teste${Date.now()}@teste.com`)

        cadastro.preencherCadastro()

        cadastro.assersaoCadastro()

    });

    it('Efetuar o login do usuário com email e sonha corretos, deve logar corretamente', () => {
        cy.visit('https://www.automationexercise.com/login')

        preencherLogin('teste1791916692592@teste.com', '123456')

        assersaoLoginSucesso()
    });

    it('Efetuar o login com usuário ou senha incorretos, deve dar mensagem de erro', () => {
        cy.visit('https://www.automationexercise.com/login')

        preencherLogin('errado@teste.com', '123456')

        assersaoLoginMensagemErro('Your email or password is incorrect!')

    });

    it('Com usuário logado, clicar em logout deve deslogar corretamente o usuário', () => {

        cy.visit('https://www.automationexercise.com/login')

        preencherLogin('teste1791916692592@teste.com', '123456')

        efetuarLogout()

        assersaoLogout()
    });

    it('Cadastrar um novo usuário com email já cadastrado, deve dar mensagem de erro', () => {
        cy.visit('https://www.automationexercise.com/')

        cadastro.inciarCadastro('Dani1791916692591 Teste', 'teste1791916692592@teste.com')

        cadastro.assersaoSignupMensagemErro('Email Address already exist!')
    });
});

// function inciarCadastro(nome, email) {
//     cy.get('a[href*=login]').click()

//     cy.get('[data-qa="signup-name"]').type(nome)
//     cy.get('[data-qa="signup-email"]').type(email)

//     cy.get('[data-qa="signup-button"]').click()
// }

// function preencherCadastro() {
//     cy.get('#id_gender2').click()
//     cy.get('[data-qa="password"]').type('123456')
//     cy.get('[data-qa="days"]').select('1')
//     cy.get('[data-qa="months"]').select('February')
//     cy.get('[data-qa="years"]').select('1981')

//     cy.get('#optin').check()

//     cy.get('[data-qa="first_name"]').type('Dani9')
//     cy.get('[data-qa="last_name"]').type('Teste')

//     cy.get('[data-qa="address"]').type('Endereço Teste')

//     cy.get('[data-qa="country"]').select('United States')
//     cy.get('[data-qa="state"]').type('California')
//     cy.get('[data-qa="city"]').type('San Francisco')
//     cy.get('[data-qa="zipcode"]').type('12345')

//     cy.get('[data-qa="mobile_number"]').type('55 11 99998888')

//     cy.get('[data-qa="create-account"]').click()
// }

// function assersaoCadastro() {
//     cy.get('[data-qa="account-created"]')
//         .should('be.visible')
//         .and('contain', 'Account Created!')

// }

function preencherLogin(email, senha) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)

    cy.get('[data-qa="login-button"]').click()
}

function assersaoLoginSucesso() {
    cy.get('a > b').should('contain', 'Dani1791916692591 Teste')
}

function assersaoLoginMensagemErro(mensagem) {
    cy.get('form[action*="login"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain.text', mensagem)
}

// function assersaoSignupMensagemErro(mensagem) {
//     cy.get('form[action*="signup"] > p')
//         .should('exist')
//         .should('be.visible')
//         .should('contain.text', mensagem)
// }

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