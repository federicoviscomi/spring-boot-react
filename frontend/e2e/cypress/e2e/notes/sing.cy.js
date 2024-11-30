describe('Sanity and Edge Cases', () => {
    beforeEach(() => {
        cy.viewport(1280, 720); // Set consistent viewport
        cy.visit('http://localhost:3000/');
    });

    it('should ensure elements on the login page are visible', () => {
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');

        // Assert all login form elements are present
        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#login-button').should('be.visible');
    });

    it('should log in with valid credentials and navigate to notes', () => {
        cy.get('#sign-in').should('be.visible').click();
        cy.url().should('include', '/login');

        // Use environment variables for sensitive data
        cy.get('#username').type(Cypress.env('ADMIN_USER'));
        cy.get('#password').type(Cypress.env('ADMIN_PASS'));
        cy.get('#login-button').click();

        cy.url().should('include', '/notes');
    });

    it('should handle invalid login credentials gracefully', () => {
        cy.get('#sign-in').should('be.visible').click();
        cy.url().should('include', '/login');

        // Invalid credentials
        cy.get('#username').type('invalidUser');
        cy.get('#password').type('wrongPass');
        cy.get('#login-button').click();

        // Assert error message appears
        cy.get('#login-failed').should('be.visible')
            .and('contain', 'Login failed');

        // Ensure the user stays on the login page
        cy.url().should('include', '/login');
        cy.get('#close-login-failed').should('be.visible').click();
        cy.get('#close-login-failed').should('not.be.visible');
    });

    it('should handle navigation to a non-existent note', () => {
        cy.get('#sign-in').click();
        cy.get('#username').type(Cypress.env('ADMIN_USER'));
        cy.get('#password').type(Cypress.env('ADMIN_PASS'));
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');

        // Attempt to view a non-existent note
        cy.visit('http://localhost:3000/notes/9999');

        // Assert a "not found" message or redirection to a fallback page
        cy.get('.not-found-message').should('be.visible')
            .and('contain', 'Note not found');
        cy.url().should('include', '/notes');
    });

    it('should allow navigating back and forth between notes', () => {
        cy.get('#sign-in').click();
        cy.get('#username').type(Cypress.env('ADMIN_USER'));
        cy.get('#password').type(Cypress.env('ADMIN_PASS'));
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');

        // View a note
        cy.get('#view-note-4').click();
        cy.url().should('include', '/notes/4');

        // Go back to notes list
        cy.get('#go-back').click();
        cy.url().should('include', '/notes');

        // Go to another note
        cy.get('#view-note-5').click();
        cy.url().should('include', '/notes/5');
    });

    it('should log out and confirm the user is redirected', () => {
        cy.get('#sign-in').click();
        cy.get('#username').type(Cypress.env('ADMIN_USER'));
        cy.get('#password').type(Cypress.env('ADMIN_PASS'));
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');

        // Log out
        cy.get('#logout').click();

        // Verify user is redirected to home or login page
        cy.url().should('include', '/');
        cy.get('#sign-in').should('be.visible');
    });

    it('should handle an expired session gracefully', () => {
        cy.get('#sign-in').click();
        cy.get('#username').type(Cypress.env('ADMIN_USER'));
        cy.get('#password').type(Cypress.env('ADMIN_PASS'));
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');

        // Simulate an expired session
        cy.clearCookies(); // Simulate session expiry
        cy.reload();

        // Ensure the user is redirected to login
        cy.url().should('include', '/login');
        cy.get('.session-expired-message').should('be.visible')
            .and('contain', 'Your session has expired. Please log in again.');
    });
});
