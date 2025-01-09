import userJson from "../fixtures/user.json";

describe("Dashboard component", () => {
  const testUser = {
    name: "John Doe",
    email: "john.doe@example.com",
  };
  beforeEach(() => {
    cy.visit("/sign-in");
    cy.get('input[name="email"]').type(userJson.email);
    cy.get('input[name="password"]').type(userJson.password);
    cy.get('button[type="submit"]').click();
    cy.location("pathname").should("eq", "/welcome");
  });

  it("should render the dashboard correctly", () => {
    cy.get("h1").should("have.text", "Dashboard");
    cy.get("button").contains("Add User").should("exist");
  });

  describe("Adding a user", () => {
    it("should add a new user successfully", () => {
      const testUser = {
        name: "John Doe",
        email: "john.doe@example.com",
      };

      cy.get("button").contains("Add User").click();

      cy.get("h2").contains("Add User").should("be.visible");

      cy.get('input[name="name"]').type(testUser.name);
      cy.get('input[name="email"]').type(testUser.email);

      cy.contains("Confirm").click();

      cy.get("div").contains(testUser.name).should("exist");
      cy.get("div").contains(testUser.email).should("exist");

      cy.get('div[role="dialog"]').should("not.exist");
    });
  });

  describe("Deleting a user", () => {
    beforeEach(() => {
      cy.get("button").contains("Add User").click();

      cy.get("h2").contains("Add User").should("be.visible");

      cy.get('input[name="name"]').type(testUser.name);
      cy.get('input[name="email"]').type(testUser.email);

      cy.contains("Confirm").click();
    });

    it("should delete user successfully", () => {
      cy.get('[data-cy="delete-user"]').first().click();

      cy.get("div").contains("john.doe@example.com").should("not.exist");
    });
  });

  describe("Updating a user", () => {
    beforeEach(() => {
      const testUser = {
        name: "John Doe",
        email: "john.doe@example.com",
      };

      cy.get("button").contains("Add User").click();

      cy.get("h2").contains("Add User").should("be.visible");

      cy.get('input[name="name"]').type(testUser.name);
      cy.get('input[name="email"]').type(testUser.email);

      cy.contains("Confirm").click();
    });

    it("should update user successfully", () => {
      const updatedUser = {
        name: "John Smith",
        email: "john.doe@example.com",
      };

      cy.get('[data-cy="update-user"]').first().click();

      cy.get('input[name="name"]').clear().type(updatedUser.name);

      cy.contains("Confirm").click();

      cy.get("div").contains(updatedUser.name).should("exist");

      cy.get('div[role="dialog"]').should("not.exist");
    });
  });
});
