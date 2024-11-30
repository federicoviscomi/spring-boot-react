/// <reference types="cypress" />

describe('example to-do app', () => {
    it('just kind of a sanity check', () => {
        cy.viewport(1280, 720);
        cy.visit('http://localhost:3000/');
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');
        cy.get('#username').type('admin');
        cy.get('#password').type('adminPass');
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');
        cy.get('#view-note-4').click();
        cy.url().should('include', '/notes/4');
        cy.get('#go-back').click();
        cy.url().should('include', '/notes');
        cy.get('#logout').click();
    });

    it('just kind of a sanity check', () => {
        cy.viewport(1280, 720);
        cy.visit('http://localhost:3000/');
        cy.get('#sign-up').click();
        cy.url().should('include', '/signup');
        cy.get('#username').type('admin1');
        cy.get('#email').type('admin1@admin.com');
        cy.get('#password').type('adminPass1');
        cy.get('#register').click();
        cy.url().should('include', '/login');


        cy.get('#username').type('admin1');
        cy.get('#password').type('adminPass1');
        cy.get('#login-button').click();
        cy.url().should('include', '/notes');
        cy.get('#logout').click();


        cy.visit('http://localhost:3000/');
        cy.get('#sign-in').click();
        cy.url().should('include', '/login');
        cy.get('#username').type('admin');
        cy.get('#password').type('adminPass');
        cy.get('#login-button').click();
        cy.get('#admin').click();
        cy.get('#admin1').click();
        cy.get('#delete').click();
        cy.get('#logout').click();
    });


    // todo: create note, view it, check the text and delete it
})
