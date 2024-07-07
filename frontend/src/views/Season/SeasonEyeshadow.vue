<template>
  <div class="color_select" v-if="filteredColorShades.length">
    <span v-for="(color, index) in filteredColorShades" :key="index" :style="{ background: color }"
      class="color-circle">
    </span>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      displayProduct: null,
      similarProducts: [],
      colorTone: null
    };
  },
  computed: {
    filteredCategory() {
      return this.products.filter(product => product.colorTone === this.colorTone && product.productCategory === 'Eyeshadow');
    },

    filteredColorShades() {
      const allColorShades = [];
      // Add the color shades of the filtered category products
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
  align-items: center;
  margin: 20px 0;
}

.color_select span {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 50%;
}

.separator {
  width: 1px;
  height: 50px;
  background-color: #000;
  margin-right: 10px;
}
</style>