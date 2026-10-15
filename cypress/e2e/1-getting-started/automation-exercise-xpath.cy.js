require('cypress-xpath');

describe('Automation Exercise', () => {
    it('Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com/')

        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click()

        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[2]').type(`Dani${Date.now()} Teste`)
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[3]').type(`teste${Date.now()}@teste.com`)

        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/button').click()

        cy.xpath('//*[@id="id_gender2"]').click()
        cy.xpath('//*[@id="password"]').type('123456')
        cy.xpath('//*[@id="days"]').select('1')
        cy.xpath('//*[@id="months"]').select('February')
        cy.xpath('//*[@id="years"]').select('1981')
        
        cy.xpath('//*[@id="optin"]').check()

        cy.xpath('//*[@id="first_name"]').type('Dani9')
        cy.xpath('//*[@id="last_name"]').type('Teste')
        
        cy.xpath('//*[@id="address1"]').type('Endereço Teste')
        
        cy.xpath('//*[@id="country"]').select('United States')
        cy.xpath('//*[@id="state"]').type('California')
        cy.xpath('//*[@id="city"]').type('San Francisco')
        cy.xpath('//*[@id="zipcode"]').type('12345')

        cy.xpath('//*[@id="mobile_number"]').type('55 11 99998888')

        cy.xpath('//*[@id="form"]/div/div/div/div[1]/form/button').click()
        
    });

    it('Efetuar o login do usuário com email e sonha corretos, deve logar corretamente', () => {

        cy.visit('https://www.automationexercise.com/login')

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type('teste1791916692592@teste.com')
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type('123456')

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click()

        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[10]/a/b').should('contain', 'Dani1791916692591 Teste')
    });

    it('Efetuar o login com usuário ou senha incorretos, deve dar mensagem de erro', () => {
        cy.visit('https://www.automationexercise.com/login')

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type('errado@teste.com')
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type('123456')

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click()

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/p')
            .should('exist')
            .should('be.visible')
            .should('contain.text', 'Your email or password is incorrect!')
        
    });

    it('Com usuário logado, clicar em logout deve deslogar corretamente o usuário', () => {

        cy.visit('https://www.automationexercise.com/login')

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type('teste1791916692592@teste.com')
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type('123456')

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click()

        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[10]/a/b').should('contain', 'Dani1791916692591 Teste')

        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a')
            .should('be.visible')
            .click()

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/h2').should('be.visible')
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form').should('be.visible')
        cy.url().should('include', 'login')
    });

    it('Cadastrar um novo usuário com email já cadastrado, deve dar mensagem de erro', () => {
        cy.visit('https://www.automationexercise.com/')

        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click()

        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[2]').type(`Dani1791916692591 Teste`)
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[3]').type(`teste1791916692592@teste.com`)

        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/button').click()
        
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .and('contain.text', 'Email Address already exist!')
        
    });
});