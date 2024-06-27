<template>
    <div>
        <h1 class="cardo-regular">{{ colorTone }}</h1>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
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
    const colorTone = computed(() => route.params.colorTone);

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
      colorTone,
    };
  }
}
</script>

<style>
</style>