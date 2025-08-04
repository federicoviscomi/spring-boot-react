import { navigateToWelcomePage, signInWithCredentials } from '../../common/admin';

describe('View notes tests', () => {
  beforeEach(() => {
    navigateToWelcomePage();
  });

  // TODO it should show list of notes

  // TODO
  // it('should handle navigation to a non-existent note', () => {
  //     cy.get('#sign-in').click();
  //     cy.get('#username').type(Cypress.env('ADMIN_USER'));
  //     cy.get('#password').type(Cypress.env('ADMIN_PASS'));
  //     cy.get('#login-button').click();
  //     cy.url().should('include', '/notes');
  //
  //     // Attempt to view a non-existent note
  //     cy.visit('http://localhost:3000/notes/9999');
  //
  //     // Assert a "not found" message or redirection to a fallback page
  //     cy.get('.not-found-message').should('be.visible')
  //         .and('contain', 'Note not found');
  //     cy.url().should('include', '/notes');
  // });

  it('should allow navigating back and forth between notes, and view note text', () => {
    signInWithCredentials(Cypress.env('ADMIN_USER'), Cypress.env('ADMIN_PASS'));
    cy.url().should('include', '/notes');

    cy.get('#view-note-9').click();
    cy.url().should('include', '/notes/9');
    cy.contains('9').should('be.visible');

    cy.get('#go-back').click();
    cy.url().should('include', '/notes');

    cy.get('#view-note-3').click();
    cy.url().should('include', '/notes/3');
  });
});
