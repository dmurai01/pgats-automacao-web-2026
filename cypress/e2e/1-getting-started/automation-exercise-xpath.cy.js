require('cypress-xpath');

describe('Automation Exercise', () => {
    // Cadastro

    it('Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com/')

        cy.xpath('//a[contains(@href, "login")]').click()

        cy.xpath('//*[@data-qa="signup-name"]').type(`Dani${Date.now()} Teste`)
        cy.xpath('//*[@data-qa="signup-email"]').type(`teste${Date.now()}@teste.com`)

        cy.xpath('//*[@data-qa="signup-button"]').click()

        cy.xpath('//*[@id="id_gender2"]').click()
        cy.xpath('//*[@data-qa="password"]').type('123456')
        cy.xpath('//*[@data-qa="days"]').select('1')
        cy.xpath('//*[@data-qa="months"]').select('February')
        cy.xpath('//*[@data-qa="years"]').select('1981')

        cy.xpath('//*[@id="optin"]').check()

        cy.xpath('//*[@data-qa="first_name"]').type('Dani9')
        cy.xpath('//*[@data-qa="last_name"]').type('Teste')

        cy.xpath('//*[@data-qa="address"]').type('Endereço Teste')

        cy.xpath('//*[@data-qa="country"]').select('United States')
        cy.xpath('//*[@data-qa="state"]').type('California')
        cy.xpath('//*[@data-qa="city"]').type('San Francisco')
        cy.xpath('//*[@data-qa="zipcode"]').type('12345')

        cy.xpath('//*[@data-qa="mobile_number"]').type('55 11 99998888')

        cy.xpath('//*[@data-qa="create-account"]').click()

        cy.xpath('//*[@data-qa="account-created"]')
            .should('be.visible')
            .and('contain', 'Account Created!')

    });

    it('Efetuar o login do usuário com email e sonha corretos, deve logar corretamente', () => {

        cy.visit('https://www.automationexercise.com/login')

        cy.xpath('//*[@data-qa="login-email"]').type('teste1791916692592@teste.com')
        cy.xpath('//*[@data-qa="login-password"]').type('123456')

        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.contains('Dani1791916692591 Teste').should('be.visible')
    });

    it('Efetuar o login com usuário ou senha incorretos, deve dar mensagem de erro', () => {
        cy.visit('https://www.automationexercise.com/login')

        cy.xpath('//*[@data-qa="login-email"]').type('errado@teste.com')
        cy.xpath('//*[@data-qa="login-password"]').type('123456')

        cy.xpath('//*[@data-qa="login-button"]').click()

        // cy.xpath('//*a > b').should('contain', 'Dani1791916692591 Teste')
        // cy.xpath('//*.login-form > form > p').should('contain', 'Your email or password is incorrect!')
        cy.contains('Your email or password is incorrect!').should('be.visible')

    });

    it('Com usuário logado, clicar em logout deve deslogar corretamente o usuário', () => {

        cy.visit('https://www.automationexercise.com/login')

        cy.xpath('//*[@data-qa="login-email"]').type('teste1791916692592@teste.com')
        cy.xpath('//*[@data-qa="login-password"]').type('123456')

        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.xpath('//a[normalize-space()="Logout"]')
        //a[normalize-space()='Signup / Login']
            .should('be.visible')
            .click()

        cy.url().should('include', 'login')
    });

    it('Cadastrar um novo usuário com email já cadastrado, deve dar mensagem de erro', () => {
        cy.visit('https://www.automationexercise.com/')

        cy.xpath('//a[contains(@href, "login")]').click()

        cy.xpath('//*[@data-qa="signup-name"]').type(`Dani1791916692591 Teste`)
        cy.xpath('//*[@data-qa="signup-email"]').type(`teste1791916692592@teste.com`)

        cy.xpath('//*[@data-qa="signup-button"]').click()

        cy.contains('Email Address already exist!').should('be.visible')
            
    });
});