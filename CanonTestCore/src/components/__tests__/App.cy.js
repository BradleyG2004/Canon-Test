import App from "../../App.vue";

const fakeProducts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  product_code: `P00${i}`,
  product_name: `Product ${i}`,
  product_status: "active",
  price: 10 + i,
  weight: 1.2 + i,
  release_date: "2024-01-01",
  is_available: i % 2 === 0,
  meta_created_date: "2024-04-17T14:22:31.000Z",
}));

describe("<App />", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/product/", {
      statusCode: 200,
      body: fakeProducts,
    }).as("getProducts");
  });

  it("monte l'application sans erreur", () => {
    cy.mount(App);
    cy.wait("@getProducts");
  });

  it("affiche les 5 premiers produits par défaut", () => {
    cy.mount(App);
    cy.wait("@getProducts");
    cy.get("tbody tr").should("have.length", 5);
    cy.get("tbody").should("contain.text", "Product 0");
    cy.get("tbody").should("contain.text", "Product 4");
  });

  it("passe à la page 2 correctement", () => {
    cy.mount(App);
    cy.wait("@getProducts");
    cy.get(".pagination li").contains("2").click();
    cy.get("tbody").should("contain.text", "Product 5");
    cy.get("tbody").should("contain.text", "Product 9");
  });

  it("affiche le formulaire de création lorsqu'on clique sur le bouton 'Add a product'", () => {
    cy.mount(App);
    cy.wait("@getProducts");

    cy.contains("Add a product").click();
    cy.get("form").should("exist"); // supposé que le CreateProduct contient une balise <form>
  });

  it("affiche le formulaire de mise à jour après clic sur ✏️", () => {
    cy.mount(App);
    cy.wait("@getProducts");

    cy.get("button[aria-label='Update product']").first().click();
    cy.get("form").should("exist"); // pareil ici, on suppose qu'il y a une balise <form> dans UpdateProduct
  });

  it("affiche le formulaire de suppression après clic sur 🗑️", () => {
    cy.mount(App);
    cy.wait("@getProducts");

    cy.get("button[aria-label='Delete product']").first().click();
    cy.get("button[aria-label='Dlt']").first().click();
  });

});
