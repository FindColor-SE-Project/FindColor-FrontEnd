<template>
  <div class="product-list">
    <ProductCard v-for="product in filteredCategory" :key="product.productID" :product="product" />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios';
import { useRoute } from 'vue-router'

export default {
  components: {
    ProductCard
  },
  setup () {
    const route = useRoute();
    const products = ref([]);
    const brandName = computed(() => route.params.brandName);

    const filteredCategory = computed(() => {
      return products.value.filter(product => product.brandName === brandName.value && product.productCategory === 'Lips');
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

    watch(
      () => route.params.brandName,
      async (newBrandName, oldBrandName) => {
        if (newBrandName !== oldBrandName) {
          await fetchData();
        }
      }
    );

    return {
      products,
      brandName,
      filteredCategory
    };
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

</style>