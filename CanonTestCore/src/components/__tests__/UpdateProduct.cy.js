import UpdateProduct from "../../UpdateProduct.vue";

describe("<UpdateProduct />", () => {
  const mountComponent = (props = {}) => {
    cy.mount(UpdateProduct, {
      props: {
        productToUpdate: {
          id: 1,
          product_code: "",
          product_status: "EN VENTE",
          product_name: "",
          price: 0,
          weight: 0,
          release_date: "",
          is_available: false,
          created_by: "bradley",
          ...props.productToUpdate,
        },
        ...props,
      },
    });
  };

  it("affiche le formulaire avec les champs préremplis", () => {
    mountComponent({
      productToUpdate: {
        product_code: "ABC12345",
        product_name: "Test Product",
        price: 50,
        weight: 1.5,
        release_date: "2024-10-01",
        is_available: true,
      },
    });

    cy.get('input[name="product_code"]').should("have.value", "ABC12345");
    cy.get('input[name="product_name"]').should("have.value", "Test Product");
    cy.get('input[name="price"]').should("have.value", "50");
    cy.get('input[name="weight"]').should("have.value", "1.5");
    cy.get('input[name="release_date"]').should("have.value", "2024-10-01");
    cy.get('select[name="is_available"]').should("have.value", "true");
  });

  it("envoie les bonnes données à l’API en mode PUT", () => {
    cy.intercept("PUT", "/api/product/1/", {
      statusCode: 200,
      body: {},
    }).as("updateProduct");

    mountComponent({
      productToUpdate: {
        id: 1,
        product_code: "TEST1234",
        product_status: "NOUVEAUTÉ",
        product_name: "Nouveau produit",
        price: 99.99,
        weight: 2.5,
        release_date: "2025-01-01",
        is_available: true,
        created_by: "bradley",
      },
    });

    cy.get('button[type="submit"]').click();

    cy.wait("@updateProduct")
      .its("request.body")
      .should((body) => {
        expect(body.product_code).to.equal("TEST1234");
        expect(body.product_status).to.equal("NOUVEAUTÉ");
        expect(body.product_name).to.equal("Nouveau produit");
        expect(body.price).to.equal(99.99);
        expect(body.weight).to.equal(2.5);
        expect(body.release_date).to.equal("2025-01-01");
        expect(body.is_available).to.be.true;
      });
  });
});
