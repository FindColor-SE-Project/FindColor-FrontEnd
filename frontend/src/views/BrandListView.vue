<template>
  <div>
    <h1 class="card-title cardo-regular">Brands</h1>
    <div class="card-container">
      <BrandCard v-for="product in limitedProducts" :key="product.productID" :product="product" />  
    </div>
  </div>
</template>

<script>
import BrandCard from '@/components/BrandCard.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  components: {
    BrandCard
  },

  data() {
    return {
      products: []
    }
  },

  computed: {
    limitedProducts() {
      const brandSet = new Set();
      const limitedProductArray = [];

      this.products.forEach(product => {
        if (!brandSet.has(product.brandName)) {
          brandSet.add(product.brandName);
          limitedProductArray.push(product);
        }
        
        if (limitedProductArray.length === 5) return limitedProductArray;
      });

      return limitedProductArray;
    }
  },

  methods: {
    async fetchData() {
      const router = useRouter();
      try {
        const response = await axios.get('http://localhost:8000/data');
        this.products = response.data;
      } catch (error) {
        console.error(error, "Error, You didn't connect with the database.");
        router.push({ name: 'DatabaseError' });
      }
    }
  },

  mounted() {
    this.fetchData();
  }
}

</script>

<style scoped>
.card-title {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 2%;
  font-size: 72px;
  font-style: italic;
  font-weight: bold;
}

.card-container {
  grid-template-columns: repeat(3, 2fr);
  /* padding-block: 2rem; */
  display: grid;
  justify-items: center;
  align-items: center;
}
</style>