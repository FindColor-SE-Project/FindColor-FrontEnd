<template>
  <div>
    <h1 class="card-title cardo-regular">Brands</h1>
    <div class="card-container">
      <BrandCard v-for="product in limitedProducts" :key="product.productID" :product="product" />  
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import BrandCard from '@/components/BrandCard.vue';
import axios from 'axios';

export default {
  components: {
    BrandCard
  },

  setup() {
    const products = ref([]);
    const limitedProducts = computed(() => {
      const brandSet = new Set();
      const limitedProductArray = [];

      products.value.forEach(product => {
        if (!brandSet.has(product.brandName)) {
          brandSet.add(product.brandName);
          limitedProductArray.push(product);
        }
        
        if (limitedProductArray.length === 5) return limitedProductArray;  // หยุดเมื่อได้ครบ 5 การ์ด
      });

      return limitedProductArray;
    });
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/data');
        products.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchData);

    return {
      products,
      limitedProducts
    };
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