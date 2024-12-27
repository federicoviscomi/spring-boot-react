import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000'
  },
  env: {
    HOME_PAGE: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    ADMIN_USER: "admin",
    ADMIN_PASS: "adminPass",
    ADMIN_EMAIL: "admin@example.com",
    NONADMIN_USERNAME: "user1",
    NONADMIN_PASSWORD: "password1",
  },
});
