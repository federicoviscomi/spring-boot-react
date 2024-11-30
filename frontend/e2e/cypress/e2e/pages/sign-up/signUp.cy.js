// TODO should all e2e test be run in a test container?!
// I think so because they should be deterministic
//
describe('Signup flow', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);

        // navigate to landing page
        cy.visit('http://localhost:3000/');
    });

    it('should register a new user', () => {
        // navigate to signup page
        cy.get('#sign-up').click();
        cy.url().should('include', '/signup');

        // fill in new user details
        cy.get('#username').type('admin1');
        cy.get('#email').type('admin1@admin.com');
        cy.get('#password').type('adminPass1');

        // register user
        cy.get('#register').click();
        cy.url().should('include', '/login');
    });

    it('should log in as the new user and then log out', () => {
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');
        cy.get('#username').type('admin1');
        cy.get('#password').type('adminPass1');
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');
        cy.get('#logout').should('be.visible').click();
    });

    it('logs in as admin and deletes the new user to cleanup', () => {
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');

        cy.get('#username').type('admin');
        cy.get('#password').type('adminPass');
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');

        cy.get('#admin').should('be.visible').click();
        cy.url().should('include', '/admin/users');

        // Admin operations
        cy.get('#admin1').should('be.visible').click();
        cy.get('#delete-user').click();
        cy.get('#user-deleted').should('be.visible');
        cy.get('#close-user-deleted-toast').click();

        // Ensure user is removed
        // TODO make this work cy.get('#user-list').should('not.contain', 'admin1');
        cy.get('#admin1').should('not.exist');

        cy.get('#logout').click();
    });
});
