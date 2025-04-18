<template>
  <div class="overlay">
    <div class="form-container">
      <button class="close-btn" @click="emit('close')">✖</button>
      <h2 id="title">Update a product</h2>
      <hr />
      <form @submit.prevent="submitProduct">
        <label class="form-label"> Code produit </label>
        <input
          maxlength="8"
          name="product_code"
          v-model="product.product_code"
          class="form-control"
          type="text"
          required
        />
        <span class="text-danger" v-if="errors.product_code">{{
          errors.product_code[0]
        }}</span>

        <label class="control-label"> Statut du produit </label>
        <select v-model="product.product_status" class="form-select" required>
          <option value="EN VENTE">EN VENTE</option>
          <option value="NOUVEAUTÉ">NOUVEAUTÉ</option>
          <option value="EMBARGO">EMBARGO</option>
          <option value="FIN DE VIE">FIN DE VIE</option>
          <option value="OBSOLETE">OBSOLETE</option>
        </select>
        <span class="text-danger" v-if="errors.product_status">{{
          errors.product_status[0]
        }}</span>

        <label class="control-label"> Nom du produit </label>
        <input
          name="product_name"
          class="form-control"
          v-model="product.product_name"
          type="text"
          required
        />
        <span class="text-danger" v-if="errors.product_name">{{
          errors.product_name[0]
        }}</span>

        <label class="control-label"> Prix </label>
        <input
          name="price"
          class="form-control"
          type="number"
          v-model="product.price"
          step="any"
          required
        />

        <label class="control-label"> Poids (kg) </label>
        <input
          required
          name="weight"
          class="form-control"
          v-model="product.weight"
          type="number"
          step="any"
        />

        <label class="control-label"> Date de sortie </label>
        <input
          name="release_date"
          class="form-control"
          type="date"
          v-model="product.release_date"
          required
        />
        <span class="text-danger" v-if="errors.release_date">{{
          errors.release_date[0]
        }}</span>

        <label class="control-label"> Disponible ? </label>
        <select
          name="is_available"
          v-model="product.is_available"
          class="form-select"
          required
        >
          <option :value="true">Available ✅</option>
          <option :value="false">Not Available ❌</option>
        </select>

        <br />
        <button id="add" type="submit">POST</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#title {
  color: crimson;
  font-weight: bold;
}

.text-danger {
  color: crimson;
  font-size: 0.9rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  /* fond sombre */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.form-container {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
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

#add {
  background-color: crimson;
  color: white;
  border-color: crimson;
}
</style>

<script setup>
import { ref, defineEmits,watch } from "vue";
import axios from "axios";

const emit = defineEmits(["close"]);
const props = defineProps({
  productToUpdate: Object,
});

const product = ref({
  product_code: "",
  product_status: "EN VENTE",
  product_name: "",
  price: 0,
  weight: 0,
  release_date: "",
  is_available: false,
  created_by: "",
});

watch(
  () => props.productToUpdate,
  (newVal) => {
    if (newVal) {
      product.value = { ...newVal };
    }
  },
  { immediate: true }
);

const errors = ref({});

const submitProduct = async () => {
  errors.value = {};

  if (!product.value.product_code) {
    errors.value.product_code = ["Le code produit est requis."];
  }
  if (!product.value.product_status) {
    errors.value.product_status = ["Le statut du produit est requis."];
  }
  if (!product.value.product_name) {
    errors.value.product_name = ["Le nom du produit est requis."];
  }
  if (product.value.price <= 0) {
    errors.value.price = ["Le prix doit être supérieur à zéro."];
  }
  if (!product.value.release_date) {
    errors.value.release_date = ["La date de sortie est requise."];
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  try {
    console.log("Données envoyées :", product.value);
    await axios.put(`/api/product/${product.value.id}/`, product.value);
    alert("Produit modifié avec succès !");
    emit("close");
  } catch (error) {
    if (error.response && error.response.status === 400) {
      errors.value = error.response.data;
    } else {
      console.error("Erreur inattendue :", error);
    }
  }
};
</script>
