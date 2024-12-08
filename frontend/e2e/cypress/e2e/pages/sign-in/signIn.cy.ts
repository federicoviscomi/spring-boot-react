import {
  signOut,
  navigateToWelcomePage,
  signInWithCredentials,
} from "../../common/admin";

describe("Sign in page tests", () => {
  beforeEach(() => {
    navigateToWelcomePage();
  });

  it("should ensure elements on the sign-in page are visible", () => {
    cy.get("#sign-in-tab").click();
    cy.get("#username").should("be.visible").should("not.be.disabled");
    cy.get("#password").should("be.visible").should("not.be.disabled");
    cy.get("#sign-in-button").should("be.visible").should("not.be.disabled");
    // TODO add other elements
  });

  it("should log in with valid credentials and navigate to main notes page", () => {
    signInWithCredentials(Cypress.env("ADMIN_USER"), Cypress.env("ADMIN_PASS"));
  });

  it("should handle invalid login credentials gracefully", () => {
    signInWithCredentials("notExistingUsername", "password");

    cy.get("#sign-in-failed")
      .should("be.visible")
      .and("contain", "Sign in failed");

    cy.url().should("include", "/welcome");
    cy.get("#close-sign-in-failed").should("be.visible");
    cy.get("#close-sign-in-failed").click();
    cy.get("#close-sign-in-failed").should("not.be.visible");
  });

  it("should log out and confirm the user is redirected", () => {
    signInWithCredentials(Cypress.env("ADMIN_USER"), Cypress.env("ADMIN_PASS"));

    cy.url().should("include", "/notes");

    signOut();

    cy.url().should("include", "/welcome");
    cy.get("#sign-in-tab").should("be.visible");
  });

  // // TODO fix this
  // it('should handle an expired session gracefully', () => {
  //     cy.get('#sign-in').click();
  //     cy.get('#username').type(Cypress.env('ADMIN_USER'));
  //     cy.get('#password').type(Cypress.env('ADMIN_PASS'));
  //     cy.get('#login-button').click();
  //     cy.url().should('include', '/notes');
  //
  //     // Simulate an expired session
  //     cy.clearCookies(); // Simulate session expiry
  //     cy.reload();
  //
  //     // Ensure the user is redirected to sign-in page
  //     cy.url().should('include', '/login');
  //     cy.get('.session-expired-message').should('be.visible')
  //        .and('contain', 'Your session has expired. Please log in again.');
  // });
});
