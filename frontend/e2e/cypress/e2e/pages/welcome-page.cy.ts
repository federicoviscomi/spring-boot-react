import { navigateToWelcomePage } from "../common/admin";

describe("Welcome page tests", () => {
  it("should be able to navigate to welcome page", () => {
    navigateToWelcomePage();
    cy.url().should("include", Cypress.env("WELCOME_PAGE"));
  });

  it("should ensure sign-in and sig-up tabs buttons are visible", () => {
    navigateToWelcomePage();

    cy.get("#sign-in-tab").should("be.visible").should("not.be.disabled");
    cy.get("#sign-up-tab").should("be.visible").should("not.be.disabled");
  });

  it("should ensure elements on the sign-in tab are visible", () => {
    navigateToWelcomePage();

    cy.get("#sign-in-tab").click();
    cy.get("#username").should("be.visible").should("not.be.disabled");
    cy.get("#password").should("be.visible").should("not.be.disabled");
    cy.get("#sign-in-button").should("be.visible").should("not.be.disabled");
  });

  it("should ensure elements on the sign-up tab are visible", () => {
    navigateToWelcomePage();

    cy.get("#sign-up-tab").click();
    cy.get("#username").should("be.visible").should("not.be.disabled");
    cy.get("#email").should("be.visible").should("not.be.disabled");
    cy.get("#password").should("be.visible").should("not.be.disabled");
    cy.get("#sign-up-button").should("be.visible").should("not.be.disabled");
  });
});
