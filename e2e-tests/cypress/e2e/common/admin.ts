export const signUpWithCredentials = (
  username: string,
  email: string,
  password: string,
) => {
  cy.get("#username").type(username);
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#sign-up-button").click();
  //cy.get("#sign-in-button").should("be.visible");
};

export const navigateToSignUpTab = () => {
  cy.get("#sign-up-tab").click();
  cy.get("#sign-up-button").should("be.visible");
};

export const navigateToSignInTab = () => {
  cy.get("#sign-in-tab").click();
  cy.get("#sign-in-button").should("be.visible");
};

export const navigateToWelcomePage = () => {
  cy.viewport(1280, 720);
  cy.visit(Cypress.env("HOME_PAGE"));
};

export const signInWithCredentials = (username: string, password: string) => {
  cy.get("#sign-in-tab").click();
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#sign-in-button").click();
};

export const signOut = () => {
  cy.get("#open-settings").click();
  cy.get("#app-bar-sign-out").click();
};
