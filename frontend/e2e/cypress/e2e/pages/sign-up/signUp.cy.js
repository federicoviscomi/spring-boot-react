// TODO should all e2e test be run in a test container?!
// I think so because they should be deterministic
//
describe("Signup flow", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    // navigate to landing page
    cy.visit("http://localhost:3000/");
  });

  it("should register a new user", () => {
    // navigate to signup page
    cy.get("#sign-up").click();
    cy.url().should("include", "/signup");

    // fill in new user details
    cy.get("#username").type("admin1");
    cy.get("#email").type("admin1@admin.com");
    cy.get("#password").type("adminPass1");

    // register user
    cy.get("#register").click();
    cy.url().should("include", "/login");
  });

  it("should prevent duplicate username registration", () => {
    // navigate to signup page
    cy.get("#sign-up").click();
    cy.url().should("include", "/signup");

    // fill in new user details
    cy.get("#username").type("admin1");
    cy.get("#email").type("admin1@admin.com");
    cy.get("#password").type("adminPass1");

    // register user
    cy.get("#register").click();
    cy.url().should("include", "/signup");

    // Assert error message is displayed
    cy.get("#username-error")
      .should("be.visible")
      .and("contain", "username is already taken");
  });

  it("should prevent duplicate email registration", () => {
    // navigate to signup page
    cy.get("#sign-up").click();
    cy.url().should("include", "/signup");

    // fill in new user details
    cy.get("#username").type("admin123");
    cy.get("#email").type(Cypress.env("ADMIN_EMAIL"));
    cy.get("#password").type("adminPass1");

    // register user
    cy.get("#register").click();
    cy.url().should("include", "/signup");

    // Assert error message is displayed
    cy.get("#email-error")
      .should("be.visible")
      .and("contain", "Email is already in use");
  });

  // TODO
  // it('should validate email format during registration', () => {
  //     cy.get('#sign-up').click();
  //     cy.url().should('include', '/signup');
  //
  //     // Attempt to register with invalid email
  //     cy.get('#username').type('user1');
  //     cy.get('#email').type('invalid-email'); // Invalid email format
  //     cy.get('#password').type('password123');
  //     cy.get('#register').click();
  //
  //     // Assert error message for invalid email
  //     cy.get('.error-message').should('be.visible')
  //         .and('contain', 'Please enter a valid email address');
  //
  //     // Retry with valid email
  //     cy.get('#email').clear().type('valid.email@example.com');
  //     cy.get('#register').click();
  //
  //     cy.url().should('include', '/login');
  // });

  it("should log in as the new user and then log out", () => {
    cy.get("#sign-in").click();
    cy.url().should("include", "/login");
    cy.get("#username").type("admin1");
    cy.get("#password").type("adminPass1");
    cy.get("#login-button").click();
    cy.url().should("include", "/notes");
    cy.get("#logout").should("be.visible").click();
  });

  it("should log in as admin and delete the new user to cleanup", () => {
    cy.get("#sign-in").click();
    cy.url().should("include", "/login");

    cy.get("#username").type("admin");
    cy.get("#password").type("adminPass");
    cy.get("#login-button").click();
    cy.url().should("include", "/notes");

    cy.get("#admin").should("be.visible").click();
    cy.url().should("include", "/admin/users");

    cy.get("#view-user-admin1").click();
    cy.get("#delete-user").click();
    cy.get("#user-deleted").should("be.visible");
    cy.get("#close-user-deleted-toast").click();

    // Ensure user is removed
    // TODO make this work cy.get('#user-list').should('not.contain', 'admin1');
    cy.get("#view-user-admin1").should("not.exist");

    cy.get("#logout").click();
  });

  it("should prevent deleted users from logging in", () => {
    cy.get("#sign-in").click();
    cy.url().should("include", "/login");
    cy.get("#username").type("admin1");
    cy.get("#password").type("adminPass1");
    cy.get("#login-button").click();

    // Assert login fails with an appropriate message
    cy.get("#login-failed").should("be.visible").and("contain", "Login failed");
  });

  // TODO there are likely a lot more test cases such as password policy violations!
});
