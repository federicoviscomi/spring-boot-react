import {
  signOut,
  navigateToWelcomePage,
  signInWithCredentials,
} from "../../common/admin";

describe("Role Management", () => {
  beforeEach(() => {
    navigateToWelcomePage();
  });

  it("admin should be able to change a user's role", () => {
    signInWithCredentials(Cypress.env("ADMIN_USER"), Cypress.env("ADMIN_PASS"));

    cy.get("#open-app-bar-admin-users").should("be.visible").click();
    cy.url().should("include", "/admin/users");

    cy.get("#view-user-user1").click();

    // TODO do the rest

    signOut();
  });

  it("non admin should not be able to change a user's role", () => {

  });
});
