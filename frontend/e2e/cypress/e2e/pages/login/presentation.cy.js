describe("Login page presentation", () => {
  it("should ensure elements on the login page are visible", () => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000/");
    cy.get("#sign-in").click();
    cy.url().should("include", "/login");
    cy.get("#username").should("be.visible").should("not.be.disabled");
    cy.get("#password").should("be.visible").should("not.be.disabled");
    cy.get("#login-button").should("be.visible").should("not.be.disabled");
    // TODO add all elements
  });
});
