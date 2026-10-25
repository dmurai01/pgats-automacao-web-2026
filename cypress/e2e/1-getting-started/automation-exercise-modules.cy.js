const cadastro = require('../../modules/cadastro/index.js')
const login = require('../../modules/login/index.js')
const { faker } = require('@faker-js/faker');

const novoNome = faker.person.firstName();
const novoSobrenome = faker.person.lastName();
const novoEmail = `${novoNome}.${novoSobrenome}@teste.com`

describe('Automation Exercise', () => {
    
    it('Cadastrar um novo usuário com sucesso', () => {
        // cy.visit('https://www.automationexercise.com/')
        cy.visit('/')

        cy.get('a[href*=login]').click()

        cadastro.inciarCadastro(`${novoNome} ${novoSobrenome}`, `${novoEmail}`)

        cadastro.preencherCadastro()

        cadastro.assersaoCadastro()

    });

    it('Efetuar o login do usuário com email e sonha corretos, deve logar corretamente', () => {
        // cy.visit('https://www.automationexercise.com/login')
        cy.visit('/login')

        login.preencherLogin('teste1791916692592@teste.com', '123456')

        login.assersaoLoginSucesso()
    });

    it('Efetuar o login com usuário ou senha incorretos, deve retornar mensagem de erro', () => {
        cy.visit('/login')

        login.preencherLogin('errado@teste.com', '123456')

        login.assersaoLoginMensagemErro('Your email or password is incorrect!')

    });

    it('Com usuário logado, clicar em logout deve deslogar corretamente o usuário', () => {
        cy.visit('/login')

        login.preencherLogin('teste1791916692592@teste.com', '123456')

        login.efetuarLogout()

        login.assersaoLogout()
    });

    it('Cadastrar um novo usuário com email já cadastrado, deve retornar mensagem de erro', () => {
        cy.visit('/')

        cadastro.inciarCadastro('Dani1791916692591 Teste', 'teste1791916692592@teste.com')

        cadastro.assersaoSignupMensagemErro('Email Address already exist!')
    });
});
