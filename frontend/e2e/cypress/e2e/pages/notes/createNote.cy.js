describe('Sanity and Edge Cases', () => {
    beforeEach(() => {
        cy.viewport(1280, 720); // Set consistent viewport
        cy.visit('http://localhost:3000/');
    });

    // TODO it should create a note and then go to note list and find it
    // TODO it should not allow to create an empty note
});
