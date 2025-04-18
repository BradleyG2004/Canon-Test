<template>
  <div class="overlay">
    <div class="dialog">
      <button class="close-btn" @click="emit('close')">✖</button>
      <h2>Supprimer ce produit ?</h2>
      <hr />
      <p>
        <strong>{{ productToDelete.product_name }}</strong>
      </p>
      <div class="actions">
        <button class="btn cancel" @click="emit('close')">Annuler</button>
        <button class="btn delete" @click="deleteProduct">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  productToDelete: Object,
});
const emit = defineEmits(["close"]);

const deleteProduct = async () => {
  try {
    await axios.delete(`/api/product/${props.productToDelete.id}/`);
    alert("Produit supprimé avec succès !");
    emit("close");
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert("Une erreur est survenue pendant la suppression.");
    emit("close"); // Émettre l'événement même en cas d'erreur pour fermer la boîte de dialogue
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
}

.btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.cancel {
  background-color: lightgray;
}

.delete {
  background-color: crimson;
  color: white;
}
</style>
