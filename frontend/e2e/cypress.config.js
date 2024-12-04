const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    ADMIN_USER: "admin",
    ADMIN_PASS: "adminPass",
    ADMIN_EMAIL: "admin@example.com",
    NONADMIN_USERNAME: "user1",
    NONADMIN_PASSWORD: "password1",
  },
});
