<template>
  <div>
    <h1 class="card-title cardo-regular">{{ brandName }}</h1>
      <div class="category-select">
        <router-link class="josefin-sans-font category-layout" :to="{ name: 'productListView' }">All</router-link>
        <router-link class="josefin-sans-font category-layout" :to="{ name: 'lipsView' }">Lips</router-link>
        <router-link class="josefin-sans-font category-layout" :to="{ name: 'blushView' }">Blush</router-link>
        <router-link class="josefin-sans-font category-layout" :to="{ name: 'eyeshadowView' }">Eyeshadow</router-link>
      </div>
      <!-- <div class="product-list">
        <ProductCard v-for="product in filteredProducts" :key="product.productID" :product="product" />
      </div> -->
      <router-view></router-view>
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
  // setup () {
  //   const route = useRoute();
  //   const products = ref([]);
  //   const brandName = computed(() => route.params.brandName);

  //   const filteredProducts = computed(() => {
  //     try {
  //       return products.value.filter(product => product.brandName === brandName.value);
  //     } catch (error) {
  //       console.error('Error filtering products:', error);
  //       return [];
  //     }
  //   });

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/data');
  //       products.value = response.data;
  //     } catch (error) {
  //       console.error('Network Error to fetch the database.',error);
  //     }
  //   };

  //   onMounted(fetchData);

  //   watch(
  //     () => route.params.brandName,
  //     async (newBrandName, oldBrandName) => {
  //       if (newBrandName !== oldBrandName) {
  //         await fetchData();
  //       }
  //     }
  //   );

  //   return {
  //     products,
  //     brandName,
  //     filteredProducts
  //   };
  // }

  data() {
    return {
      products: [],
      brandName: null // มาจากที่เรากำหนด path: '/brandListView/:brandName'
    }
  },

  computed: {
    filteredProducts() {
      try {
        return this.products.filter(product => product.brandName === this.brandName);
      } catch (error) {
        console.error('Error filtering products:', error);
        return [];
      }
    }
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/data');
        this.products = response.data;
      } catch (error) {
        console.error(error, "Error, You didn't connect with the database.");
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
  text-decoration: none; 
  color: inherit;
  padding: 5px 10px;
}

.router-link-exact-active {
  background-color: #EDC2D8;
}

</style>