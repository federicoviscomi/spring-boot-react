describe('Landing page tests', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit('http://localhost:3000/');
    });

    it('should ensure sign-in and sig-up buttons are visible', () => {
        cy.get('#sign-in')
            .should('be.visible')
            .should('not.be.disabled');
        cy.get('#sign-up')
            .should('be.visible')
            .should('not.be.disabled');
    });
});
