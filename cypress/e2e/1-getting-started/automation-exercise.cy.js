require('cypress-xpath');

describe('Automation Exercise', () => {
    // Cadastro

    it('Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com/')

        cy.get('a[href*=login]').click()

        cy.get('[data-qa="signup-name"]').type(`Dani${Date.now()} Teste`)
        cy.get('[data-qa="signup-email"]').type(`teste${Date.now()}@teste.com`)

        cy.get('[data-qa="signup-button"]').click()

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
        
    });

    it('Efetuar o login do usuário com email e sonha corretos, deve logar corretamente', () => {

        cy.visit('https://www.automationexercise.com/login')

        cy.get('[data-qa="login-email"]').type('teste1791916692592@teste.com')
        cy.get('[data-qa="login-password"]').type('123456')

        cy.get('[data-qa="login-button"]').click()

        cy.get('a > b').should('contain', 'Dani1791916692591 Teste')
    });

    it('Efetuar o login com usuário ou senha incorretos, deve dar mensagem de erro', () => {
        cy.visit('https://www.automationexercise.com/login')

        cy.get('[data-qa="login-email"]').type('errado@teste.com')
        cy.get('[data-qa="login-password"]').type('123456')

        cy.get('[data-qa="login-button"]').click()

        // cy.get('a > b').should('contain', 'Dani1791916692591 Teste')
        // cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
        cy.get('form[action*="login"] > p')
            .should('exist')
            .should('be.visible')
            .should('contain,text', 'Your email or password is incorrect!')
        
    });

    it('Com usuário logado, clicar em logout deve deslogar corretamente o usuário', () => {

        cy.visit('https://www.automationexercise.com/login')

        cy.get('[data-qa="login-email"]').type('teste1791916692592@teste.com')
        cy.get('[data-qa="login-password"]').type('123456')

        cy.get('[data-qa="login-button"]').click()

        cy.get('a > b').should('contain', 'Dani1791916692591 Teste')

        cy.get('a[href*="logout"]')
            .should('be.visible')
            .click()

        cy.get('.login-form > h2').should('be.visible')
        cy.get('a[href*="logout"]').should('not.exist')
        cy.get('[action*="login"]').should('be.visible')
        cy.url().should('include', 'login')
    });

    it('Cadastrar um novo usuário com email já cadastrado, deve dar mensagem de erro', () => {
        cy.visit('https://www.automationexercise.com/')

        cy.get('a[href*=login]').click()

        cy.get('[data-qa="signup-name"]').type(`Dani1791916692591 Teste`)
        cy.get('[data-qa="signup-email"]').type(`teste1791916692592@teste.com`)

        cy.get('[data-qa="signup-button"]').click()

        cy.get('form[action*=signup] p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .and('contain.text', 'Email Address already exist!')
        
    });
});