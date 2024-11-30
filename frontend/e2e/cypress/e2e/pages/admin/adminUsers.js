describe('User Management Flow', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit('http://localhost:3000/');
    });

    it('should prevent admin from deleting self', () => {
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');

        cy.get('#username').type('admin');
        cy.get('#password').type('adminPass');
        cy.get('#login-button').click();

        // Navigate to admin panel
        cy.get('#admin').should('be.visible').click();

        // Attempt to delete self
        cy.get('#delete-user').click();

        // Assert appropriate error or no action is taken
        cy.get('#cannot-delete-self').should('be.visible')
            .and('contain', 'Cannot delete yourself!');

        cy.get('#close-cannot-delete-self')
            .click();

        cy.get('#logout').click();
    });

    it('should restrict non-admin users from accessing the admin panel', () => {
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');

        // Login as a regular user
        cy.get('#username').type(Cypress.env('NONADMIN_USERNAME'));
        cy.get('#password').type(Cypress.env('NONADMIN_PASSWORD'));
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');

        // Navigate to admin panel
        cy.get('#admin')
            .should('be.visible')
            .should('be.disabled');

        // Attempt to access admin panel
        cy.visit('http://localhost:3000/admin/users');

        // Assert redirection or error
        // hmmmm ... is redirection better?
        // or maybe a toast and a redirection?!
        cy.url().should('not.include', '/admin/users');
        cy.get('.error-message').should('be.visible')
            .and('contain', 'Access denied');

        cy.get('#logout').click();
    });


});
