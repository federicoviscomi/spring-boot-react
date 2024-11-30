describe('Signup page presentation', () => {
    it('should ensure elements on the login page are visible', () => {
        cy.viewport(1280, 720);
        cy.visit('http://localhost:3000/');
        cy.get('#sign-up').click();
        cy.url().should('include', '/signup');
        cy.get('#username')
            .should('be.visible')
            .should('not.be.disabled');
        cy.get('#password')
            .should('be.visible')
            .should('not.be.disabled');
        cy.get('#email')
            .should('be.visible')
            .should('not.be.disabled');
        cy.get('#register')
            .should('be.visible')
            .should('not.be.disabled');
    });
});
