describe('User Management Flow', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit('http://localhost:3000/');
    });

    it('ensures deleted user cannot log in', () => {
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');

        cy.get('#username').type('admin1');
        cy.get('#password').type('adminPass1');
        cy.get('#login-button').click();

        // Error message assertion
        cy.get('.error-message').should('be.visible')
            .and('contain', 'Invalid username or password');
    });

    it('should prevent duplicate registration', () => {
        cy.get('#sign-up').should('be.visible').click();
        cy.url().should('include', '/signup');

        // Attempt to register with an existing username/email
        cy.get('#username').type('admin1');
        cy.get('#email').type('admin1@admin.com');
        cy.get('#password').type('adminPass1');
        cy.get('#register').click();

        // Assert error message is displayed
        cy.get('.error-message').should('be.visible')
            .and('contain', 'Username or email already exists');
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
        cy.get('#admin').click(); // Assuming this targets the admin's row
        cy.get('#delete').click();

        // Assert appropriate error or no action is taken
        cy.get('.error-message').should('be.visible')
            .and('contain', 'You cannot delete your own account');

        cy.get('#logout').click();
    });

    it('should restrict non-admin users from accessing the admin panel', () => {
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');

        // Login as a regular user
        cy.get('#username').type('admin1');
        cy.get('#password').type('adminPass1');
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');

        // Attempt to access admin panel
        cy.visit('http://localhost:3000/admin');

        // Assert redirection or error
        cy.url().should('not.include', '/admin');
        cy.get('.error-message').should('be.visible')
            .and('contain', 'Access denied');

        cy.get('#logout').click();
    });

    it('should validate email format during registration', () => {
        cy.get('#sign-up').click();
        cy.url().should('include', '/signup');

        // Attempt to register with invalid email
        cy.get('#username').type('user1');
        cy.get('#email').type('invalid-email'); // Invalid email format
        cy.get('#password').type('password123');
        cy.get('#register').click();

        // Assert error message for invalid email
        cy.get('.error-message').should('be.visible')
            .and('contain', 'Please enter a valid email address');

        // Retry with valid email
        cy.get('#email').clear().type('valid.email@example.com');
        cy.get('#register').click();

        cy.url().should('include', '/login');
    });

    it('should prevent deleted users from logging in', () => {
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');

        // Attempt to log in as deleted user
        cy.get('#username').type('admin1');
        cy.get('#password').type('adminPass1');
        cy.get('#login-button').click();

        // Assert login fails with an appropriate message
        cy.get('.error-message').should('be.visible')
            .and('contain', 'Invalid username or password');
    });


});
