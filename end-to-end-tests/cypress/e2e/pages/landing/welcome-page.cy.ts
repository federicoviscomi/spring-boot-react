import { navigateToWelcomePage } from '../../common/admin';

describe('Welcome page tests', () => {
  it('should be able to navigate to home page', () => {
    navigateToWelcomePage();
    cy.url().should('include', Cypress.env('HOME_PAGE'));
  });

  it('should ensure sso buttons are visibile', () => {
    navigateToWelcomePage();

    cy.get('#sign-in-with-google').should('be.visible');
    cy.get('#sign-in-with-github').should('be.visible');
  });

  it('should ensure elements on the sign-in tab are visible', () => {
    navigateToWelcomePage();

    cy.contains('button', 'Sign In').click();

    cy.get('#username').should('be.visible').should('not.be.disabled');
    cy.get('#password').should('be.visible').should('not.be.disabled');
    cy.get('#sign-in-button').should('be.visible').should('not.be.disabled');
  });

  it('should ensure elements on the sign-up tab are visible', () => {
    navigateToWelcomePage();

    cy.contains('button', 'Sign Up').click();

    cy.get('#username').should('be.visible').should('not.be.disabled');
    cy.get('#email').should('be.visible').should('not.be.disabled');
    cy.get('#password').should('be.visible').should('not.be.disabled');
    cy.get('#sign-up-button').should('be.visible').should('not.be.disabled');
  });
});
