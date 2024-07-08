<template>
  <div class="product-container">
    <div class="season-left">
      <!-- Left -->
    </div>

    <div class="season-right">
      <h2 class="cardo-regular">Your season color tone is</h2>
      <h1 class="cardo-regular">{{ colorTone }}</h1>
      <div class="category_season">
        <router-link class="josefin-sans-font category-layout" :to="{ name: 'seasonLips' }">Lips</router-link>
        <router-link class="josefin-sans-font category-layout" :to="{ name: 'seasonBlush' }">Blush</router-link>
        <router-link class="josefin-sans-font category-layout" :to="{ name: 'seasonEyeshadow' }">Eyeshadow</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  components: {
    ProductCard,
  },

  data() {
    return {
      products: [],
      colorTone: null,
    };
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

  computed: {
    filteredProducts() {
      return this.products.filter(product => product.colorTone === this.colorTone);
    }
  },

  mounted() {
    this.fetchData();
    const route = useRoute();

    this.colorTone = route.params.colorTone;
  }
}
</script>

<style>
.product-container {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.season-left, .season-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
}

.color-option {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid #000;
  background-size: cover;
  background-position: center;
}
</style>
