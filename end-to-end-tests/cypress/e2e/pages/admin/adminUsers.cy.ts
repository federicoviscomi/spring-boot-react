import { signOut, navigateToWelcomePage, signInWithCredentials } from '../../common/admin';

describe('User Management Flow', () => {
  it('should allow an admin user to access the admin panel', () => {
    navigateToWelcomePage();

    signInWithCredentials(Cypress.env('ADMIN_USER'), Cypress.env('ADMIN_PASS'));

    cy.get('#open-app-bar-admin-users').click();
    cy.url().should('include', '/admin/users');

    signOut();
  });

  it('should prevent an admin user from deleting itself', () => {
    navigateToWelcomePage();

    signInWithCredentials(Cypress.env('ADMIN_USER'), Cypress.env('ADMIN_PASS'));

    cy.get('#open-app-bar-admin-users').click();
    cy.url().should('include', '/admin/users');

    cy.get('#view-user-admin').click();
    cy.url().should('include', '/admin/users/2');

    cy.get('#delete-user').click();
    cy.get('#cannot-delete-self').should('be.visible').and('contain', 'Cannot delete yourself!');
    cy.get('#close-cannot-delete-self').click();

    signOut();
  });

  it('should restrict non-admin users from accessing the admin panel', () => {
    navigateToWelcomePage();

    signInWithCredentials(Cypress.env('NONADMIN_USERNAME'), Cypress.env('NONADMIN_PASSWORD'));

    cy.url().should('include', '/notes');
    cy.visit('/admin/users');
    cy.url().should('include', '/access-denied');
    cy.get('#home').click();

    signOut();
  });

  it('should prevent an admin user from deleting another admin user', () => {
    assert.fail('Test not implemented yet');
  });

  it('should allow an admin user to delete a non-admin user', () => {
    assert.fail('Test not implemented yet');
  });

  it('should allow an admin user to view its profile', () => {
    assert.fail('Test not implemented yet');
  });

  it('should allow an admin user to view another admin user profile', () => {
    assert.fail('Test not implemented yet');
  });

  it('should allow an admin user to view a non-admin user profile', () => {
    assert.fail('Test not implemented yet');
  });
});
