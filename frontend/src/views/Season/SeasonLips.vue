<template>
  <div class="color_select" v-if="filteredColorShades.length">
    <div class="color-circles">
      <span v-for="(color, index) in filteredColorShades" :key="index" :style="{ background: color }"
        @click="showProductCard(index)">
      </span>
    </div>
    <div class="product-card-container">
      <ProductCard v-if="displayProduct" :product="displayProduct" />
    </div>
  </div>
  <div v-else>Sorry, No color shades available </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  components: {
    ProductCard,
  },

  data() {
    return {
      products: [],
      displayProduct: null,
      colorTone: null
    };
  },
  computed: {
    filteredCategory() {
      return this.products.filter(product => product.colorTone === this.colorTone && product.productCategory === 'Lips');
    },

    filteredColorShades() {
      const allColorShades = [];
      this.filteredCategory.forEach(product => {
        if (product.colorShade) {
          allColorShades.push(...(this.extractColors(product.colorShade)));
        }
      });
      return allColorShades;
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/data');
        this.products = response.data;
        console.log('Products fetched:', this.products);

        this.displayProduct = this.products.find(p =>
          p.productName.includes(this.$route.params.productName)
        );

        console.log('Display product:', this.displayProduct);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    extractColors(colorShade) {
      const matches = colorShade.match(/\((\d+),\s*(\d+),\s*(\d+)\)/g);
      if (matches) {
        return matches.map(match => {
          const [_, r, g, b] = match.match(/\((\d+),\s*(\d+),\s*(\d+)\)/).map(Number);
          return `rgb(${r}, ${g}, ${b})`;
        });
      }
      return [];
    },

    showProductCard(index) {
      if (this.displayProduct && this.displayProduct === this.filteredCategory[index]) {
        this.displayProduct = null;
      } else {
        this.displayProduct = this.filteredCategory[index];
      }
      console.log('Display product:', this.displayProduct);
    }
  },

  mounted() {
    const route = useRoute();
    this.colorTone = route.params.colorTone;
    this.fetchData();
  }
};
</script>

<style scoped>
.color_select {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.color-circles {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.color-circles span {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.product-card-container {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
