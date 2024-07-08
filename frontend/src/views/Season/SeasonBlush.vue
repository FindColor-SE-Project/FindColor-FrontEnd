<template>
  <div class="color_select" v-if="groupedByProduct.length">
    <div class="color-group-container">
      <div v-for="([productName, colorGroups], index) in groupedByProduct" :key="index" class="color-group">
        <div v-for="(colors, subIndex) in colorGroups" :key="subIndex" class="color-subgroup">
          <span v-for="(color, colorIndex) in colors" :key="colorIndex" :style="{ background: color }" 
            @click="showProductCard(productName, color)" class="color-circle">
          </span>
        </div>
        <!-- vertical line -->
        <div v-if="index < groupedByProduct.length - 1" class="vertical-line"></div>
      </div>
    </div>
    <div class="product-card-container" v-if="displayProduct">
      <ProductCard :product="displayProduct" />
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
      similarProducts: [],
      displayProductColor: null,
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
    },

    showProductCard(productName, color) {
      if (this.displayProduct && this.displayProduct.productName === productName && this.displayProductColor === color) {
        this.displayProduct = null;
        this.displayProductColor = null;
      } else {
        this.displayProduct = this.products.find(product => product.productName === productName);
        this.displayProductColor = color;
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

.color-group-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.color-group {
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
}

.color-subgroup {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.color-circle {
  width: 50px;
  height: 50px; 
  border: 1px solid #000;
  border-radius: 50%;
  margin-right: 5px;
}

.vertical-line {
  width: 0.75px;
  background-color: #000;
  height: 25px;
  align-self: stretch;
  margin-left: 5px;
  margin-top: 15px;
}

.product-card-container {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>