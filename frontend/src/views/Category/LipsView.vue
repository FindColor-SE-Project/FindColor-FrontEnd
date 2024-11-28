<template>
  <div class="product-list">
    <ProductPreview v-for="product in filteredBrandAndProductCategory" :key="product.productID" :product="product" />
    <div v-if="filteredBrandAndProductCategory.length === 0" class="error-page cardo-regular">Sorry, {{ brandName }} didn't have this product category</div>
  </div>
</template>

<script>
import ProductPreview from '@/components/ProductPreview.vue';
import axios from 'axios';
import { useRoute } from 'vue-router'

export default {
  components: {
    ProductPreview
  },

  data() {
    return {
      products: [],
      brandName: null
    }
  },

  computed: {
    filteredBrandAndProductCategory() {
      return this.products.filter(product => product.brandName === this.brandName && product.productCategory === 'Lips')
    }
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/data');
        this.products = response.data;
      } catch (error) {
        console.error("Error, You didn't connect with the database.", error);
      }
    }
  },

  mounted() {
    this.fetchData();
    const route = useRoute();
    this.brandName = route.params.brandName;
  }
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card-title {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 2%;
  font-size: 72px;
  font-style: italic;
  font-weight: bold;
}

.category-select {
  text-align: center;
  padding: 20px;
}

.category-layout {
  font-size: 24px;
  font-style: #000;
  margin: 0 10px;
  border: 1px solid #EDC2D8;
  /* background-color: #EDC2D8; */
  text-decoration: none; 
  color: inherit;
  padding: 5px 10px;
}

.error-page {
  font-size: 32px;
  margin: 20px 0;
}
</style>
