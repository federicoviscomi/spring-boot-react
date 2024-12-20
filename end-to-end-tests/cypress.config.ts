import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl
  },
  env: {
    HOME_PAGE: process.env.CYPRESS_baseUrl,
    ADMIN_USER: "admin",
    ADMIN_PASS: "adminPass",
    ADMIN_EMAIL: "admin@example.com",
    NONADMIN_USERNAME: "user1",
    NONADMIN_PASSWORD: "password1",
  },
});
