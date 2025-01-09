import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      API_URL: "https://reqres.in/api",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
