import userJson from "../fixtures/user.json";

describe("SignIn Component", () => {
  beforeEach(() => {
    cy.visit("sign-in");
  });

  it("should render sigIn form with all fields", () => {
    cy.get("h2").contains("Sign In to your account").should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it("should handle form submission successfully on login", () => {
    cy.get('input[name="email"]').type(userJson.email);
    cy.get('input[name="password"]').type(userJson.password);
    cy.get('button[type="submit"]').click();
    cy.location("pathname").should("eq", "/welcome");
  });
});
