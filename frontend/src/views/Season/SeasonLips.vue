<template>
  <div class="color_select" v-if="filteredColorShades.length">
    <span v-for="(gradient, index) in filteredColorShades" :key="index" :style="{ background: gradient }"
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
    // combinedColorShades() {
    //   const allColorShades = [];
    //   if (this.displayProduct) {
    //     // Add the color shades of the main product
    //     if (this.displayProduct.colorShade) {
    //       allColorShades.push(this.createGradient(this.extractColors(this.displayProduct.colorShade)));
    //     }

    //     // Add the color shades of similar products
    //     this.similarProducts.forEach(product => {
    //       if (product.colorShade) {
    //         allColorShades.push(this.createGradient(this.extractColors(product.colorShade)));
    //       }
    //     });
    //   }
    //   return allColorShades;
    // },

    filteredCategory() {
      return this.products.filter(product => product.colorTone === this.colorTone && product.productCategory === 'Lips');
    },

    filteredColorShades() {
      const allColorShades = [];
      // Add the color shades of the filtered category products
      this.filteredCategory.forEach(product => {
        if (product.colorShade) {
          allColorShades.push(this.createGradient(this.extractColors(product.colorShade)));
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