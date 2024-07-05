<template>
  <div>
    <h2>Lips Products</h2>
    <div class="color_select">
      <span v-for="(gradient, index) in combinedColorShades" :key="index" :style="{ background: gradient }" class="color-circle"></span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

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
    combinedColorShades() {
      const allColorShades = [];
      if (this.displayProduct) {
        // Add the color shades of the main product
        if (this.displayProduct.colorShade) {
          allColorShades.push(this.createGradient(this.extractColors(this.displayProduct.colorShade)));
        }

        // Add the color shades of similar products
        this.similarProducts.forEach(product => {
          if (product.colorShade) {
            allColorShades.push(this.createGradient(this.extractColors(product.colorShade)));
          }
        });
      }
      return allColorShades;
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

    createGradient(colors) {
      if (colors.length === 1) {
        return colors[0];
      } else if (colors.length === 2) {
        return `linear-gradient(to right, ${colors[0]} 50%, ${colors[1]} 50%)`;
      } else if (colors.length === 3) {
        return `conic-gradient(${colors[0]} 0% 33.33%, ${colors[1]} 33.33% 66.66%, ${colors[2]} 66.66% 100%)`;
      } else if (colors.length === 4) {
        return `conic-gradient(${colors[0]} 0% 25%, ${colors[1]} 25% 50%, ${colors[2]} 50% 75%, ${colors[3]} 75% 100%)`;
      }
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
</style>