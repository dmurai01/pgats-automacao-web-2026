# Automation Exercise - Trabalho Final

Este documento descreve como instalar as dependências, executar o spec
`automation-exercise-trabalho-final.cy.js` e consultar o relatório Mochawesome.

## Requisitos

- Node.js 20 ou superior
- npm
- Acesso à internet para acessar o site [Automation Exercise](https://www.automationexercise.com/)

## Dependências

As dependências estão declaradas no `package.json` do projeto:

- **Cypress**: execução dos testes E2E.
- **cypress-mochawesome-reporter**: integração do reporter Mochawesome com o Cypress e geração do relatório HTML.
- **mochawesome**: formato e apresentação do relatório de execução.
- **@faker-js/faker**: geração de nomes e e-mails usados nos cadastros dos testes.
- **cypress-xpath**: dependência disponível no projeto para seletores XPath.

O spec também usa os módulos de cadastro, login e produto disponíveis em
`cypress/modules/`.

## Instalação

Na raiz do repositório, instale as dependências:

```bash
npm ci
```

## Executar o spec

Para executar somente este arquivo em modo headless:

```bash
npx cypress run --spec "cypress/e2e/1-getting-started/automation-exercise-trabalho-final.cy.js"
```

Para abrir a interface do Cypress e executar o spec interativamente:

```bash
npx cypress open
```

Na interface, selecione **E2E Testing** e depois
`automation-exercise-trabalho-final.cy.js`.

## Cenários cobertos

O spec valida os seguintes fluxos:

- Cadastro de usuário e tentativa de cadastro com e-mail já existente.
- Login com credenciais válidas e inválidas, e logout.
- Visualização de produtos, detalhes de produto e pesquisa.
- Inscrição na newsletter.
- Finalização de pedido após cadastro ou login.

## Relatório Mochawesome

Após a execução local, o relatório HTML é gerado em:

```text
cypress/reports/html/index.html
```

Abra esse arquivo em um navegador para consultar o resultado. Os arquivos do
relatório são gerados localmente e a pasta `cypress/reports/` está no `.gitignore`,
portanto não é versionada no repositório.

## GitHub Actions (CI/CD)

O workflow
[`automation-exercise-trabalho-final.yml`](../../../.github/workflows/automation-exercise-trabalho-final.yml)
executa esse spec:

- Manualmente, pela aba **Actions** do GitHub, usando **Run workflow**.
- Automaticamente em push para as branches `main` e
  `trabalho-de-conclusao-modulo`.

O job roda em `ubuntu-latest`, configura o Node.js 20, instala as dependências com
`npm ci` e executa apenas o spec deste documento. O relatório é gerado durante a
execução no runner, mas o workflow atual não o publica como artefato; ao fim do
job, ele não fica disponível para download. O status da execução e a saída do
comando podem ser consultados nos logs do job na aba **Actions**.

Esse workflow automatiza integração contínua (CI) dos testes.
