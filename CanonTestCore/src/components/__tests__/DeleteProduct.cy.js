import DeleteProduct from "../../DeleteProduct.vue";

describe("<DeleteProduct />", () => {
  const product = {
    id: 42,
    product_name: "Produit Testé",
  };

  const mountComponent = () => {
    cy.mount(DeleteProduct, {
      props: {
        productToDelete: product,
        onClose: cy.stub().as("closeHandler"),
      },
    });
  };

  it("affiche le nom du produit à supprimer", () => {
    mountComponent();
    cy.get("p").should("contain", product.product_name);
  });

  it('ferme la modale quand on clique sur "Annuler"', () => {
    mountComponent();
    cy.contains("Annuler").click();
    cy.get("@closeHandler").should("have.been.called");
  });

  it("ferme la modale quand on clique sur le bouton de fermeture (✖)", () => {
    mountComponent();
    cy.get(".close-btn").click();
    cy.get("@closeHandler").should("have.been.called");
  });

  it("envoie la requête DELETE à l’API et affiche une alerte", () => {
    cy.stub(window, "alert").as("alert");

    cy.intercept("DELETE", `/api/product/${product.id}/`, {
      statusCode: 204,
    }).as("deleteProduct");

    mountComponent();
    cy.contains("Supprimer").click();

    // Debugging: Log the button click
    cy.log("Supprimer button clicked");

    cy.wait("@deleteProduct").then((interception) => {
      expect(interception.request.method).to.equal("DELETE");
      expect(interception.response.statusCode).to.equal(204);
    });

    cy.get("@alert").should(
      "have.been.calledWith",
      "Produit supprimé avec succès !"
    );
    cy.get("@closeHandler").should("have.been.called");
  });

  it("gère une erreur serveur lors de la suppression", () => {
    cy.stub(window, "alert").as("alert");

    cy.intercept("DELETE", `/api/product/${product.id}/`, {
      statusCode: 500,
    }).as("deleteProduct");

    mountComponent();
    cy.contains("Supprimer").click();

    // Debugging: Log the button click
    cy.log("Supprimer button clicked");

    cy.wait("@deleteProduct").then((interception) => {
      expect(interception.request.method).to.equal("DELETE");
      expect(interception.response.statusCode).to.equal(500);
    });

    cy.get("@alert").should(
      "have.been.calledWith",
      "Une erreur est survenue pendant la suppression."
    );
    cy.get("@closeHandler").should("have.been.called");
  });
});
