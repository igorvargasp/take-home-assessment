describe("ThemeToggle Component", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.clearLocalStorage("theme");
  });

  it("should render the theme toggle button", () => {
    cy.get('[data-testid="theme-toggle"]').should("exist").and("be.visible");
  });

  it("should start with light theme by default", () => {
    cy.get('[data-testid="theme-toggle"]').find("svg").should("exist");

    cy.get("html").should("not.have.class", "dark");
  });

  it("should toggle between light and dark themes", () => {
    cy.get('[data-testid="theme-toggle"]').click();

    cy.get("main").should("have.class", "dark:bg-neutral-900");

    cy.get('[data-testid="theme-toggle"]').find("svg").should("exist");

    cy.get('[data-testid="theme-toggle"]').click();

    cy.get("main").should("not.have.class", "dark");
  });
});
