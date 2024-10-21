const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 5000,
  requestTimeout: 10000,
  responseTimeout: 30000,
  viewportWidth: 1600,
  viewportHeight: 900,
  e2e: {
    baseUrl: 'http://localhost:8000',
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
  },
  env: {
    baseUrl: 'https://10.17.196.46:8443',
    wsUrl: 'wss://10.17.196.46:8443/ws',
  },
});
