import { navigateToWelcomePage, signInWithCredentials } from '../../common/admin';

describe('Note creation tests', () => {
  beforeEach(() => {
    navigateToWelcomePage();
  });

  it('should create a note, go back to list, check that it is there and then delete it', () => {
    signInWithCredentials(Cypress.env('ADMIN_USER'), Cypress.env('ADMIN_PASS'));

    cy.url().should('include', '/notes');

    cy.get('#open-app-bar-create-note').click();
    cy.url().should('include', 'create-note');

    cy.get('#note-editor').find('.ql-editor.ql-blank').type('newNoteText');

    cy.get('#create-note-button').click();

    cy.get('[data-test-element="note-item"]')
      .contains('newNoteText')
      .then(($el) => {
        const testId = $el.parents().eq(1).attr('data-test-id'); // Navigate to the parent of the parent
        cy.log(testId); // Log the 'data-test-id' value
        const viewNoteId = `#view-note-${testId}`; // Construct the id for the view note button

        // Now find the element with the constructed id and click on it
        cy.get(viewNoteId).click();
        const path = `/notes/${testId}`;
        cy.url().should('include', path);
        cy.get('#delete-note-button').click();
        cy.get('#confirm-delete-note').click();
        cy.url().should('include', '/notes');
      });
  });

  it('should not allow to create an empty note', () => {
    signInWithCredentials(Cypress.env('ADMIN_USER'), Cypress.env('ADMIN_PASS'));

    cy.url().should('include', '/notes');

    cy.get('#open-app-bar-create-note').click();
    cy.url().should('include', 'create-note');

    cy.get('#create-note-button').click();

    cy.get('#note-creation-failed').should('be.visible').and('contain', 'Note content is required');

    cy.url().should('include', '/create-note');
    cy.get('#close-note-creation-failed').should('be.visible');
    cy.get('#close-note-creation-failed').click();
    cy.get('#close-note-creation-failed').should('not.be.visible');
  });
});
