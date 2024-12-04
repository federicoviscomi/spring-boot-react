describe("User Management Flow", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000/");
  });

  it("should prevent admin from deleting self", () => {
    cy.get("#sign-in").click();
    cy.get("#username").type(Cypress.env("ADMIN_USER"));
    cy.get("#password").type(Cypress.env("ADMIN_PASS"));
    cy.get("#login-button").click();
    cy.url().should("include", "/notes");

    cy.get("#admin").should("be.visible").click();

    cy.url().should("include", "/admin/users");
    cy.get("#view-user-admin").click();
    cy.url().should("include", "/admin/users/2");
    cy.get("#delete-user").click();

    // Assert appropriate error or no action is taken
    cy.get("#cannot-delete-self")
      .should("be.visible")
      .and("contain", "Cannot delete yourself!");

    cy.get("#close-cannot-delete-self").click();

    cy.get("#logout").click();
  });

  it("should restrict non-admin users from accessing the admin panel", () => {
    cy.get("#sign-in").click();
    cy.url().should("include", "/login");

    // Login as a regular user
    cy.get("#username").type(Cypress.env("NONADMIN_USERNAME"));
    cy.get("#password").type(Cypress.env("NONADMIN_PASSWORD"));
    cy.get("#login-button").click();
    cy.url().should("include", "/notes");

    // Attempt to access admin panel
    cy.visit("http://localhost:3000/admin/users");

    cy.url().should("not.include", "/admin/users");
    cy.url().should("include", "/access-denied");
    cy.get("#logout").click();
  });
});
