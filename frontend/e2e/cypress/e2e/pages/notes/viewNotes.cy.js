describe('Sanity and Edge Cases', () => {
    beforeEach(() => {
        cy.viewport(1280, 720); // Set consistent viewport
        cy.visit('http://localhost:3000/');
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
        cy.get('#sign-in').click();
        cy.get('#username').type(Cypress.env('ADMIN_USER'));
        cy.get('#password').type(Cypress.env('ADMIN_PASS'));
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');

        // View a note
        cy.get('#view-note-9').click();
        cy.url().should('include', '/notes/9');
        cy.contains('grepme').should('be.visible');

        // Go back to notes list
        cy.get('#go-back').click();
        cy.url().should('include', '/notes');

        // Go to another note
        cy.get('#view-note-6').click();
        cy.url().should('include', '/notes/6');
    });
});
