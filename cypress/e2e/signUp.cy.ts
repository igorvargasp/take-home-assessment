import userJson from "../fixtures/user.json";

describe("SignUp Component", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage("token");
  });

  it("should render signup form with all fields", () => {
    cy.get("h2").contains("Sign up to your account").should("be.visible");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('input[name="confirmPassword"]').should("be.visible");
    cy.get('button[type="submit"]').contains("Sign Up").should("be.visible");
  });

  it("should show password match error when passwords do not match", () => {
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password456");
    cy.get("span").contains("Passwords do not match").should("be.visible");
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should handle form submission successfully", () => {
    const testUser = userJson;

    cy.get('input[name="name"]').type(testUser.name);
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('input[name="confirmPassword"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    cy.location("pathname").should("eq", "/welcome");
  });
});
