<template>
  <div class="color_select" v-if="groupedByProduct.length">
    <div class="color-group-container">
      <div v-for="([productName, colorGroups], index) in groupedByProduct" :key="index" class="color-group">
        <div v-for="(colors, subIndex) in colorGroups" :key="subIndex" class="color-subgroup">
          <span 
            v-for="(color, colorIndex) in colors" 
            :key="colorIndex" 
            :style="{ background: color }"
            @click="handleColorClick(productName, color)" 
            class="color-circle"
            :class="{ selected: isSelectedColor(color) }">
          </span>
        </div>
        <!-- vertical line -->
        <div v-if="index < groupedByProduct.length - 1" class="vertical-line"></div>
      </div>
    </div>
    <div class="product-card-container" v-if="displayProduct">
      <ProductPreview :product="displayProduct" />
    </div>
  </div>
  <div v-else class="for-error cardo-regular">Sorry, No color shades available</div>
</template>

<script>
import ProductPreview from '@/components/ProductPreview.vue';
import SelectColorLogic from "@/components/SelectColorLogic.vue";
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  props: ["colors"],
  
  components: {
    ProductPreview,
    SelectColorLogic
  },

  data() {
    return {
      products: [],
      displayProduct: null,
      similarProducts: [],
      displayProductColor: null,
      seasonColorTone: null,
      image: []
    };
  },
  computed: {
    filteredCategory() {
      return this.products.filter(
        (product) => product.seasonColorTone === this.seasonColorTone && product.productCategory === 'Eyeshadow'
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

    async handleColorClick(productName, color) {
    const isSameProduct = this.displayProduct?.productName === productName;
    this.displayProduct = isSameProduct && this.displayProductColor === color ? null :
                          this.products.find(product => product.productName === productName);
    this.displayProductColor = isSameProduct ? null : color;

    if (this.images.length > 0 && color) {
        const [r, g, b] = color.match(/\d+/g).map(Number);
        let base64Image = this.images[0].filepath;

        // Add padding if the Base64 string length is not a multiple of 4
        const padding = '='.repeat((4 - (base64Image.length % 4)) % 4);
        base64Image += padding;

        // console.log("Sending data to backend:", {
        //   r,
        //   g,
        //   b,
        //   image: base64Image
        // });

        try {
          const response = await axios.post('http://localhost:8000/apply-eyeshadow', {
            r,
            g,
            b,
            image: base64Image
          });
          
          console.log("Received updated image from backend:", response.data.image);
          this.$emit('color-clicked', response.data.image);
        } catch (error) {
          console.error("Error applying blush color:", error);
        }
      }
    },

    async getImage() {
        try {
          // Fetch images, consistent with SeasonLayout.vue
          const response = await axios.get('http://localhost:8000/user');
          this.images = response.data;

            // Assuming the first image should be used for the blush application
          if (this.images.length > 0 && this.images[0].filepath) {
            this.image = this.images[0].filepath;
            console.log("Image fetched and set:", this.image);
          } else {
            console.error("No valid image found in response data");
          }
        } catch (error) {
          console.error("Error, You didn't connect with the database.", error);
          this.$router.push({ name: 'DatabaseError' });
        }
    },
    
    isSelectedColor(color) {
      return this.displayProductColor === color;
    }

  },

  mounted() {
    const route = useRoute();
    this.seasonColorTone = route.params.seasonColorTone;
    this.fetchData();
    this.getImage();
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