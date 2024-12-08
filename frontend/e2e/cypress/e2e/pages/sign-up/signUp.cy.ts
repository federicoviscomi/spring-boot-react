// TODO should all e2e test be run in a test container?!
// I think so because they should be deterministic
//
import {
  navigateToSignInTab,
  navigateToSignUpTab,
  navigateToWelcomePage,
  signInWithCredentials,
  signOut,
  signUpWithCredentials
} from "../../common/admin";

describe("Sign up tests", () => {
  beforeEach(() => {
    navigateToWelcomePage();
  });

  it("should sign up a new user", () => {
    navigateToSignUpTab();

    signUpWithCredentials("admin1", "admin1@admin.com", "adminPass1");
    cy.get("#sign-in-button").should("be.visible");

    // TODO assert toast is there
  });

  it("should prevent duplicate username registration", () => {
    navigateToSignUpTab();

    signUpWithCredentials("admin1", "admin1@admin.com", "adminPass1");

    cy.get("#username-error")
      .should("be.visible")
      .and("contain", "username is already taken");
  });

  it("should prevent duplicate email registration", () => {
    navigateToSignUpTab();

    signUpWithCredentials("admin123", Cypress.env("ADMIN_EMAIL"), "adminPass1");

    // Assert error message is displayed
    cy.get("#email-error")
      .should("be.visible")
      .and("contain", "Email is already in use");
  });

  // TODO
  // it('should validate email format during registration', () => {
  //     cy.get('#sign-up').click();
  //     cy.url().should('include', '/signup');
  //
  //     // Attempt to register with invalid email
  //     cy.get('#username').type('user1');
  //     cy.get('#email').type('invalid-email'); // Invalid email format
  //     cy.get('#password').type('password123');
  //     cy.get('#register').click();
  //
  //     // Assert error message for invalid email
  //     cy.get('.error-message').should('be.visible')
  //         .and('contain', 'Please enter a valid email address');
  //
  //     // Retry with valid email
  //     cy.get('#email').clear().type('valid.email@example.com');
  //     cy.get('#register').click();
  //
  //     cy.url().should('include', '/login');
  // });

  it("should log in as the new user and then log out", () => {
    navigateToSignInTab();

    signInWithCredentials("admin1", "adminPass1");

    cy.url().should("include", "/notes");

    signOut();
  });

  it("should log in as admin and delete the new user to cleanup", () => {
    navigateToSignInTab();

    signInWithCredentials(Cypress.env("ADMIN_USER"), Cypress.env("ADMIN_PASS"));

    cy.url().should("include", "/notes");

    cy.get("#open-app-bar-admin-users").should("be.visible").click();
    cy.url().should("include", "/admin/users");

    cy.get("#view-user-admin1").click();
    cy.get("#delete-user").click();
    cy.get("#user-deleted").should("be.visible");
    cy.get("#close-user-deleted-toast").click();

    // Ensure user is removed
    // TODO make this work cy.get('#user-list').should('not.contain', 'admin1');
    cy.get("#view-user-admin1").should("not.exist");

    signOut();
  });

  it("should prevent deleted users from logging in", () => {
    navigateToSignInTab();

    signInWithCredentials("admin1", "adminPass1");

    cy.get("#sign-in-failed")
      .should("be.visible")
      .and("contain", "Sign in failed");
    cy.get("#close-sign-in-failed").should("be.visible").click();
  });

  // TODO there are likely a lot more test cases such as password policy violations!
});
