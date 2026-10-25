const cadastro = require('../../modules/cadastro/index.js')
const login = require('../../modules/login/index.js')
const produto = require('../../modules/produto/index.js')

const { faker } = require('@faker-js/faker');

describe('Automation Exercise', () => {
    let novoNome;
    let novoSobrenome;
    let novoEmail;

    beforeEach(() => {
        novoNome = faker.person.firstName();
        novoSobrenome = faker.person.lastName();
        novoEmail = `${novoNome}.${novoSobrenome}@teste.com`
    });

    describe('Case 1 - Cadastro de novo usuários', () => {
        it('Cadastrar um novo usuário com sucesso', () => {
            // cy.visit('https://www.automationexercise.com/')
            cy.visit('/')

            cy.get('a[href*=login]').click()

            cadastro.inciarCadastro(`${novoNome} ${novoSobrenome}`, `${novoEmail}`)
            cadastro.preencherCadastro()
            cadastro.assersaoCadastro()

        });

        it('Case 5 - Cadastrar um novo usuário com email já cadastrado, deve retornar mensagem de erro', () => {
            cy.visit('/')

            cadastro.inciarCadastro('Dani1791916692591 Teste', 'teste1791916692592@teste.com')
            cadastro.assersaoSignupMensagemErro('Email Address already exist!')
        });
    });

    describe('Login', () => {
        it('Case 2 - Efetuar o login do usuário com email e senha corretos, deve logar corretamente', () => {
            cy.visit('/login')
            //Criar novo cadastro
            cadastro.inciarCadastro(`${novoNome} ${novoSobrenome}`, `${novoEmail}`)
            cadastro.preencherCadastro()
            cy.get('[data-qa="continue-button"]').click()
            login.efetuarLogout()

            //Logar com novo cadastro
            login.preencherLogin(`${novoEmail}`, '123456')
            login.assersaoLoginSucesso(`${novoNome}`, `${novoSobrenome}`)
        });

        it('Case 3 - Efetuar o login com usuário ou senha incorretos, deve retornar mensagem de erro', () => {
            cy.visit('/login')

            login.preencherLogin('errado@teste.com', '123456')
            login.assersaoLoginMensagemErro('Your email or password is incorrect!')

        });

        it('Case 4 - Com usuário logado, clicar em logout deve deslogar corretamente o usuário', () => {
            cy.visit('/login')

            login.preencherLogin('teste1791916692592@teste.com', '123456')
            login.efetuarLogout()
            login.assersaoLogout()
        });

    });

    describe('Produtos', () => {
        it('Case 8 - Verificar se a lista de produtos na página "Produtos" abre é mostrada corretamente, e se a página de detalhe do produto mostra corretamente os detalhes', () => {
            cy.visit('/')

            cy.get('.shop-menu a[href*=products]').click()
            cy.contains('All Products').should('be.visible')
            cy.get('.features_items a[href*="product_details"]').first().click()

            cy.get('.product-information > h2').should('be.visible')
            cy.get('.product-information').should('contain.text', 'Category:')
                .and('contain.text', 'Rs')
                .and('contain.text', 'Availability')
                .and('contain.text', 'Condition')
                .and('contain.text', 'Brand')
        });

        it('Case 9 - Verificar se Pesquisar Produto retorna o produto pesquisado corretamente', () => {
            cy.visit('/')

            cy.get('.shop-menu a[href*=products]').click()
            cy.contains('All Products').should('be.visible')

            cy.get('#search_product').click().type('Fancy Green Top')
            cy.get('#submit_search').click()

            cy.get('.productinfo > p').should('contain.text', 'Fancy Green Top')

        });

    });

    describe('Subscription', () => {
        it('Case 10 - Verificar se ao se inscrever no subscription na página inicial recebe mensagem de sucesso', () => {
            cy.visit('/')

            cy.get('#susbscribe_email').click().type('teste@teste.com')
            cy.get('#subscribe').click()

            cy.get('.alert-success').should('contain.text', 'You have been successfully subscribed!')
        });
    });

    describe('Fazer Pedido', () => {
        it('Case 15 - Registre-se antes de finalizar a compra deve receber mensagem de sucesso', () => {
            cy.visit('/')

            cy.get('a[href*=login]').click()
            cadastro.inciarCadastro(`${novoNome} ${novoSobrenome}`, `${novoEmail}`)
            const dadosEndereco = cadastro.preencherCadastro()
            cadastro.assersaoCadastro()

            cy.get('[data-qa="continue-button"]').click()
            cy.get('a > b').should('contain', `${novoNome}`)

            // add produto no carrinho 
            produto.adicionarProdutoCarrinho('1')
            // checkout
            produto.checkout(dadosEndereco.nome, dadosEndereco.sobrenome, dadosEndereco.endereco, dadosEndereco.telefone)
            //asserssao
            produto.assersaoCheckout()

        });

        it('Case 16 - Fazer login antes de finalizar a compra deve receber mensagem de sucesso', () => {
            cy.visit('/')

            cadastro.inciarCadastro(`${novoNome} ${novoSobrenome}`, `${novoEmail}`)
            const dadosEndereco = cadastro.preencherCadastro()
            cadastro.assersaoCadastro()
            cy.get('[data-qa="continue-button"]').click()
            login.efetuarLogout()

            cy.get('a[href*=login]').click()
            login.preencherLogin(`${novoEmail}`, '123456')
            login.assersaoLoginSucesso(`${novoNome}`, `${novoSobrenome}`)

            // add produto no carrinho 
            produto.adicionarProdutoCarrinho('1')
            // checkout
            produto.checkout(dadosEndereco.nome, dadosEndereco.sobrenome, dadosEndereco.endereco, dadosEndereco.telefone)
            //asserssao
            produto.assersaoCheckout()
        });


    });

});
