describe('Login flow tests', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit('http://localhost:3000/');
    });

    it('should log in with valid credentials and navigate to main notes page', () => {
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

    it('should log out and confirm the user is redirected', () => {
        cy.get('#sign-in').click();
        cy.get('#username').type(Cypress.env('ADMIN_USER'));
        cy.get('#password').type(Cypress.env('ADMIN_PASS'));
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');
        cy.get('#logout').click();
        cy.url().should('include', '/login');
        cy.get('#login-button').should('be.visible');
    });

    // // TODO fix this
    // it('should handle an expired session gracefully', () => {
    //     cy.get('#sign-in').click();
    //     cy.get('#username').type(Cypress.env('ADMIN_USER'));
    //     cy.get('#password').type(Cypress.env('ADMIN_PASS'));
    //     cy.get('#login-button').click();
    //     cy.url().should('include', '/notes');
    //
    //     // Simulate an expired session
    //     cy.clearCookies(); // Simulate session expiry
    //     cy.reload();
    //
    //     // Ensure the user is redirected to sign-in page
    //     cy.url().should('include', '/login');
    //     cy.get('.session-expired-message').should('be.visible')
    //        .and('contain', 'Your session has expired. Please log in again.');
    // });
});
