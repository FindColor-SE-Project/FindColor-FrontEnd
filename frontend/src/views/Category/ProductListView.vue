<template>
  <div>
    <h1 class="card-title cardo-regular">{{ brandName }}</h1>
    <div class="category-select">
      <button class="josefin-sans-font category-selected" 
        v-bind:class="{active: currentProductCategory === 'All' }" v-on:click="setProductCategory('All')">All</button>
      <button class="josefin-sans-font category-selected" 
        v-bind:class="{active: currentProductCategory === 'Lips' }" v-on:click="setProductCategory('Lips')">Lips</button>
      <button class="josefin-sans-font category-selected"
        v-bind:class="{active: currentProductCategory === 'Blush' }" v-on:click="setProductCategory('Blush')">Blush</button>
      <button class="josefin-sans-font category-selected"
        v-bind:class="{active: currentProductCategory === 'Eyeshadow' }" v-on:click="setProductCategory('Eyeshadow')">Eyeshadow</button>
    </div>

    <div class="product-list">
      <!-- Loading Message -->
      <p v-if="loading" class="error-page cardo-regular">Loading products...</p>

      <!-- Product List -->
      <ProductPreview 
        v-else-if="filteredProducts().length > 0" 
        v-for="product in filteredProducts()" 
        :key="product.productID" 
        :product="product" 
      />

      <!-- Error Message -->
      <div 
        v-else 
        class="error-page cardo-regular">
        Sorry, {{ brandName }} didn't have any {{ currentProductCategory }} products
      </div>
    </div>
  </div>
</template>

<script>
import ProductPreview from '@/components/ProductPreview.vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    ProductPreview
  },

  data() {
    return {
      products: [],
      brandName: null,
      currentProductCategory: 'All',
      loading: true // Add a loading state
    };
  },

  methods: {
    async fetchData() {
      try {
        this.loading = true; // Start loading
        const response = await axios.get('http://localhost:8000/data');
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$router.push({ name: 'DatabaseError' });
      } finally {
        this.loading = false; // Stop loading after data fetch
      }
    },

    filteredProducts() {
      try {
        return this.products.filter(product => {
          const brand = product.brandName === this.brandName;
          const allProductCategory = 
            this.currentProductCategory === 'All' || 
            product.productCategory === this.currentProductCategory;
          return brand && allProductCategory;
        });
      } catch (error) {
        console.error('Error filtering products:', error);
        return [];
      }
    },

    setProductCategory(productCategory) {
      this.currentProductCategory = productCategory;
    }
  },

  mounted() {
    this.fetchData();
    const route = useRoute();
    this.brandName = route.params.brandName;
  }
};

</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: 0.3s;
}

.card-title {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 1%;
  font-size: 72px;
  font-style: italic;
  font-weight: bold;
}

.category-select {
  text-align: center;
  padding: 20px;
}

.category-select {
  text-align: center;
  padding: 20px;
}

.category-selected {
  font-size: 24px;
  font-style: #000;
  margin: 0 10px;
  border: 1px solid #EDC2D8;
  background-color: #fff;
  text-decoration: none; 
  color: inherit;
  padding: 5px 10px;
  transition: all 0.35s;
}

.category-selected.active {
  background-color: #EDC2D8;
}

.error-page {
  font-size: 25px;
  color: #555;
  text-align: center;
  margin: 16px 0;
}

.loading-message {
  font-size: 16px;
  font-style: italic;
  color: #888;
  text-align: center;
}

</style>