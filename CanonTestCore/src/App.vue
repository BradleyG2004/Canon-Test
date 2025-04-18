<template>
  <div class="big-div p-4 text-center">
    <h2>
      Product list -
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        version="1.0"
        viewBox="0 0 800 167.326"
        class="nav__logo-svg nav__logo-svg--red"
        width="100"
        height="25"
      >
        <g id="canon-logo">
          <path
            d="m130.62 151.03c-37.195 0-67.339-30.16-67.339-67.362 0-37.204 30.144-67.335 67.339-67.335 13.11 0 25.35 3.739 35.69 10.22l-35.69 57.115 67.19-38.796c-7.3-11.631-17.77-21.653-30.43-29.258-16.11-9.645-38.52-15.614-63.3-15.614-35.348 0-66.359 12.845-83.653 32.081-12.804 14.22-20.427 32.117-20.427 51.586 0 19.483 7.623 37.393 20.427 51.623 17.339 19.26 47.888 32.03 82.653 32.03 34.76 0 65.3-12.78 82.65-32.03 0.95-1.06 1.87-2.13 2.74-3.24l-2.62-9.82c-12.19 17.4-32.38 28.8-55.23 28.8"
          ></path>
          <path
            d="m353.38 163.27l-28.2-105.2c-4.53-17-20.01-29.495-38.44-29.495-4.78 0-9.36 0.854-13.61 2.4l-60.71 22.076h62.44l10.67 39.848c-10.35-8.908-23.83-14.328-38.59-14.328-29.31 0-53.04 19.641-53.04 43.869 0 24.23 23.73 43.9 53.04 43.9 21.1 0 39.76-10.33 51.27-26.2l6.19 23.13h48.98m-86.02-16.34c-13.52 0-24.48-10.95-24.48-24.49 0-13.52 10.96-24.48 24.48-24.48s24.49 10.96 24.49 24.48c0 13.54-10.97 24.49-24.49 24.49z"
          ></path>
          <path
            d="m468.36 28.593c-3.7 0-7.2 0.818-10.32 2.283l-38.98 18.166c-1.93-11.604-12.01-20.449-24.17-20.449-3.68 0-7.19 0.818-10.35 2.283l-47.59 22.175h33.46v110.22h48.98v-97.958c0-6.759 5.47-12.261 12.25-12.261 6.74 0 12.25 5.502 12.25 12.261v97.958h48.96v-110.22c0-13.517-10.97-24.457-24.49-24.457"
          ></path>
          <path
            d="m775.52 28.593c-3.71 0-7.23 0.818-10.4 2.283l-38.94 18.166c-1.92-11.604-12-20.449-24.16-20.449-3.68 0-7.19 0.818-10.36 2.283l-47.57 22.175h33.45v110.22h48.97v-97.958c0-6.759 5.48-12.261 12.26-12.261 6.76 0 12.23 5.502 12.23 12.261v97.958h49v-110.22c0-13.517-10.98-24.457-24.48-24.457"
          ></path>
          <path
            d="m652.01 97.959c0 38.311-31.05 69.361-69.35 69.361-38.33 0-69.4-31.05-69.4-69.361 0-38.301 31.07-69.366 69.4-69.366 38.3 0 69.35 31.066 69.35 69.366m-66.48-48.314c-2.18-8.162-10.57-13.007-18.73-10.813-8.15 2.185-13.02 10.58-10.83 18.741l23.79 88.697c2.2 8.17 10.57 13.01 18.73 10.85 8.16-2.21 13.01-10.6 10.82-18.76l-23.78-88.715z"
          ></path>
        </g>
      </svg>
    </h2>
    <hr />
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">📷</th>
          <th scope="col" class="header">Status</th>
          <th scope="col" class="header">Name</th>
          <th scope="col" class="header">Price</th>
          <th scope="col" class="header">Weight</th>
          <th scope="col" class="header">Release Date</th>
          <th scope="col" class="header">Availability</th>
          <th scope="col" class="header">Created Date</th>
          <th scope="col" class="header">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in paginatedProducts" :key="product.id">
          <td>{{ product.product_code }}</td>
          <td>{{ product.product_status }}</td>
          <td>{{ product.product_name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.weight }}</td>
          <td>{{ product.release_date }}</td>
          <td>{{ product.is_available ? "✅" : "❌" }}</td>
          <td>
            {{
              product.meta_created_date.split("T")[0] +
              " - " +
              product.meta_created_date.split("T")[1].split(".")[0]
            }}
          </td>
          <td>
            <button
              class="emobtn"
              title="Update product's informations"
              aria-label="Update product"
              @click="editProduct(product)"
            >
              ✏️
            </button>
            /
            <button
              class="emobtn"
              title="Remove product's informations"
              aria-label="Delete product"
              @click="deleteProduct(product)"
            >
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            @click.prevent="goToPage(currentPage - 1)"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="goToPage(page)">{{
            page
          }}</a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a
            class="page-link"
            href="#"
            @click.prevent="goToPage(currentPage + 1)"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <hr />
    <button id="add" @click="showCreateForm = !showCreateForm">
      Add a product
    </button>
    <CreateProduct v-if="showCreateForm" @close="onProductCreated" />
    <UpdateProduct
      v-if="showUpdtForm"
      @close="onProductUpdated"
      :productToUpdate="productToEdit"
    />
    <DeleteProduct
      v-if="showDltForm"
      @close="onDeleteProduct"
      :productToDelete="productToDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import CreateProduct from "./CreateProduct.vue";
import UpdateProduct from "./UpdateProduct.vue";
import DeleteProduct from "./DeleteProduct.vue";

const products = ref([]);

const showCreateForm = ref(false);
const showUpdtForm = ref(false);
const showDltForm = ref(false);

const editProduct = (product) => {
  productToEdit.value = product;
  showUpdtForm.value = true;
};

const deleteProduct = (product) => {
  productToDelete.value = product;
  showDltForm.value = true;
};

const productToDelete = ref(0);
const productToEdit = ref(null);

const fetchProducts = () => {
  try {
    axios
      .get("/api/product/")
      .then((response) => {
        products.value = response.data;
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  } catch (error) {
    console.error("Erreur inattendue :", error);
    alert("An unexpected error occurred. Please try again later.");
  }
};

onMounted(fetchProducts);

const onProductCreated = () => {
  showCreateForm.value = false;
  fetchProducts();
};

const onProductUpdated = () => {
  showUpdtForm.value = false;
  fetchProducts();
};

const onDeleteProduct = () => {
  showDltForm.value = false;
  fetchProducts();
};

const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<style scoped>
.big-div {
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 1200px;
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
}

.header {
  color: crimson;
  font-weight: bold;
}

#add {
  background-color: crimson;
  color: white;
  border-color: crimson;
}

.emobtn {
  border-width: 0px;
  background-color: #11ffee00;
}
</style>
