<template>
  <div class="color_select" v-if="groupedByProduct.length">
    <div v-for="([productName, colorGroups], index) in groupedByProduct" :key="index" class="color-group">
      <div v-for="(colors, subIndex) in colorGroups" :key="subIndex" class="color-subgroup">
        <span
          v-for="(color, colorIndex) in colors"
          :key="colorIndex"
          :style="{ background: color }"
          class="color-circle"
        ></span>
      </div>
      <!-- Add a vertical line after each product group except the last one -->
      <div v-if="index < groupedByProduct.length - 1" class="vertical-line"></div>
    </div>
  </div>
</template>

<script>
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
      return this.products.filter(
        (product) => product.colorTone === this.colorTone && product.productCategory === 'Blush'
      );
    },

    groupedByProduct() {
    const productMap = new Map();
    
    this.filteredCategory.forEach((product) => {
      if (product.colorShade) {
        const colors = this.extractColors(product.colorShade);
        const productName = product.productName;

        if (!productMap.has(productName)) {
          productMap.set(productName, []);
        }
        productMap.get(productName).push(colors);
      }
    });

    // Convert map to array and sort by product name
    return Array.from(productMap.entries()).sort(([a], [b]) => a.localeCompare(b));
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/data');
        this.products = response.data;
        console.log('Products fetched:', this.products);

        this.displayProduct = this.products.find((p) =>
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
        return matches.map((match) => {
          const [_, r, g, b] = match.match(/\((\d+),\s*(\d+),\s*(\d+)\)/).map(Number);
          return `rgb(${r}, ${g}, ${b})`;
        });
      }
      return [];
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

.color-group {
  display: flex;
  align-items: center;
  margin-right: 20px; /* Space between product groups */
}

.color-subgroup {
  display: flex;
  align-items: center;
  margin-right: 10px; /* Space between subgroups */
}

.color-circle {
  width: 50px; /* Size of color circles */
  height: 50px; /* Size of color circles */
  border: 1px solid #000;
  border-radius: 50%;
  margin-right: 5px; /* Space between color circles */
}

.vertical-line {
  width: 2px; /* Width of the vertical line */
  background-color: #000; /* Color of the vertical line */
  margin-left: 10px; /* Space between the last circle and the line */
  /* Adjust the height based on the height of the color circles */
  height: 50px; /* Should match the height of the color circles */
}
</style>

