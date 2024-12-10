import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  env: {
    WELCOME_PAGE: "http://localhost:3000/welcome",
    ADMIN_USER: "admin",
    ADMIN_PASS: "adminPass",
    ADMIN_EMAIL: "admin@example.com",
    NONADMIN_USERNAME: "user1",
    NONADMIN_PASSWORD: "password1",
  },
});