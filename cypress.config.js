const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: `https://www.automationexercise.com`,
    watchForFileChanges: false,
    // viewportWidth: 375,
    // viewportHeight: 750,
    env: {
      baseUrlSecundary: `https://www.google.com`
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
     video: false, // <-- Desativa a gravação automática de vídeos
  },
});
