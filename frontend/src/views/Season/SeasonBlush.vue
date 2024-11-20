<template>
  <div class="color_select" v-if="groupedByProduct.length">
    <div class="color-group-container">
      <div v-for="([productName, colorGroups], index) in groupedByProduct" :key="index" class="color-group">
        <div v-for="(colors, subIndex) in colorGroups" :key="subIndex" class="color-subgroup">
          <span 
            v-for="(color, colorIndex) in colors" 
            :key="colorIndex" 
            :style="{ background: color }"
            @click="emitColorClick(productName, color)" 
            class="color-circle"
            :class="{ selected: isSelectedColor(color) }">
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
  <div v-else class="for-error cardo-regular">Sorry, No color shades available</div>
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
      colorTone: null,
      loading: true
    };
  },
  computed: {
    filteredCategory() {
      return this.products.filter(
        (product) => product.seasonColorTone === this.seasonColorTone && product.productCategory === 'Blush'
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
        this.loading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.loading = false;
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

    // showProductCard(productName, color) {
    //   if (this.displayProduct && this.displayProduct.productName === productName && this.displayProductColor === color) {
    //     this.displayProduct = null;
    //     this.displayProductColor = null;  // Clear the selected color if it was already selected
    //   } else {
    //     this.displayProduct = this.products.find(product => product.productName === productName);
    //     this.displayProductColor = color; // Set the selected color
    //   }
    //   console.log('Display product:', this.displayProduct);
    // },

    emitColorClick(productName, color) {
      if (this.displayProduct && this.displayProduct.productName === productName && this.displayProductColor === color) {
        this.displayProduct = null;
        this.displayProductColor = null;  // Clear the selected color if it was already selected
        this.$emit('color-clicked', false);
        console.log('Emitted color-clicked with:', false);
      } else {
        this.displayProduct = this.products.find(product => product.productName === productName);
        this.displayProductColor = color; // Set the selected color
        this.$emit('color-clicked', true);
        console.log('Emitted color-clicked with:', true);
      }

      // this.$emit('color-clicked', color);  // Emit color-clicked event with color
      // this.showProductCard(productName, color);  // Track the selected color
    },

    isSelectedColor(color) {
      return this.displayProductColor === color;  // Check if the color is selected
    }
  },

  mounted() {
    const route = useRoute();
    this.seasonColorTone = route.params.seasonColorTone;
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

.color-circle  {
  width: 50px;
  height: 50px; 
  border-radius: 50%;
  margin-right: 5px;
  border: 2px solid transparent;
  transition: border-color 0.3s; 
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

.color-circle:hover {
  border-color: #000;
}

.color-circle.selected {
  border-color: #000;
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.3);
}

.for-error {
  font-size: 24px;
  margin: 20px 0;
}
</style>