import CreateProduct from "../../CreateProduct.vue";

describe("<CreateProduct />", () => {
  beforeEach(() => {
    cy.mount(CreateProduct);
    // Intercept the POST request and alias it as @postProduct
    cy.intercept("POST", "/api/product/").as("postProduct");
  });

  it("render le formulaire avec tous les champs requis", () => {
    cy.get("form").should("exist");
    cy.get('input[name="product_code"]').should("exist");
    cy.get('input[name="product_name"]').should("exist");
    cy.get('input[name="price"]').should("exist");
    cy.get('input[name="weight"]').should("exist");
    cy.get('input[name="release_date"]').should("exist");
    cy.get('select[name="is_available"]').should("exist");
  });

  it("envoie les données correctement quand le formulaire est valide", () => {
    cy.get('input[name="product_code"]').type("PRD12345");
    cy.get('input[name="product_name"]').type("Produit Test");
    cy.get('input[name="price"]').clear();
    cy.get('input[name="price"]').type("19.99");
    cy.get('input[name="weight"]').clear();
    cy.get('input[name="weight"]').type("2.5");
    cy.get('input[name="release_date"]').type("2025-04-18");
    cy.get('select[name="is_available"]').select("Available ✅");

    cy.get('button[type="submit"]').click();

    // Wait for the POST request to complete
    cy.wait("@postProduct").then((interception) => {
      expect(interception.request.body.product_code).to.equal("PRD12345");
      expect(interception.request.body.product_name).to.equal("Produit Test");
      expect(interception.request.body.price).to.equal(19.99);
      expect(interception.request.body.weight).to.equal(2.5);
      expect(interception.request.body.release_date).to.equal("2025-04-18");
      expect(interception.request.body.is_available).to.be.true;
    });
  });

  it("gère une erreur 400 retournée par l'API", () => {
    cy.intercept("POST", "/api/product/", {
      statusCode: 400,
      body: {
        product_code: ["Code déjà utilisé."],
      },
    }).as("postProductFail");

    cy.get('input[name="product_code"]').type("EXIST123");
    cy.get('input[name="product_name"]').type("Produit déjà existant");
    cy.get('input[name="price"]').clear();
    cy.get('input[name="price"]').type("25");
    cy.get('input[name="weight"]').clear();
    cy.get('input[name="weight"]').type("1.2");
    cy.get('input[name="release_date"]').type("2025-04-18");
    cy.get('select[name="is_available"]').select("Available ✅");

    cy.get('button[type="submit"]').click();

    cy.wait("@postProductFail");

    cy.get(".text-danger", { timeout: 5000 }).should("exist");
  });
});
