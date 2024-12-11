import {
  signOut,
  navigateToWelcomePage,
  signInWithCredentials,
} from "../../common/admin";

describe("User Management Flow", () => {
  it("should prevent admin from deleting self", () => {
    navigateToWelcomePage();

    signInWithCredentials(Cypress.env("ADMIN_USER"), Cypress.env("ADMIN_PASS"));

    cy.get("#open-app-bar-admin-users").click();
    cy.url().should("include", "/admin/users");

    cy.get("#view-user-admin").click();
    cy.url().should("include", "/admin/users/2");

    cy.get("#delete-user").click();
    cy.get("#cannot-delete-self")
      .should("be.visible")
      .and("contain", "Cannot delete yourself!");
    cy.get("#close-cannot-delete-self").click();

    signOut();
  });

  it("should restrict non-admin users from accessing the admin panel", () => {
    navigateToWelcomePage();

    signInWithCredentials(
      Cypress.env("NONADMIN_USERNAME"),
      Cypress.env("NONADMIN_PASSWORD"),
    );

    cy.url().should("include", "/notes");
    cy.visit("/admin/users");
    cy.url().should("include", "/access-denied");

    signOut();
  });
});
