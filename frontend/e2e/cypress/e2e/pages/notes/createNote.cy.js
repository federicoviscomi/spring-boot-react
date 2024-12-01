describe('Sanity and Edge Cases', () => {
    beforeEach(() => {
        cy.viewport(1280, 720); // Set consistent viewport
        cy.visit('http://localhost:3000/');
    });

    // TODO it should create a note and then go to note list and find it
    // TODO it should not allow to create an empty note


    it('should create a note, go back to list, check that it is there and then delete it', () => {
        cy.get('#sign-in').click();
        cy.get('#username').type(Cypress.env('ADMIN_USER'));
        cy.get('#password').type(Cypress.env('ADMIN_PASS'));
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');

        // View a note
        cy.get('#create-note-link').click();
        cy.url().should('include', 'create-note');

        cy.get('#note-editor')
            .find('.ql-editor.ql-blank')
            .type('newNoteText');

        cy.get('#create-note-button')
            .click();

        cy.get('[data-test-element="note-item"]')
            .contains('newNoteText')
            .then(($el) => {
                const testId = $el.parents().eq(1).attr('data-test-id');  // Navigate to the parent of the parent
                cy.log(testId);  // Log the 'data-test-id' value
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
});
