describe("Role Management", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000/");
  });

  it("admin should be able to change a user's role", () => {
    cy.get("#sign-in").click();
    cy.url().should("include", "/login");

    cy.get("#username").type("admin");
    cy.get("#password").type("adminPass");
    cy.get("#login-button").click();
    cy.url().should("include", "/notes");

    cy.get("#admin").should("be.visible").click();
    cy.url().should("include", "/admin/users");

    cy.get("#view-user-user1").click();

    // TODO do the rest
  });

  it("non admin should not be able to change a user's role", () => {

  });
});
