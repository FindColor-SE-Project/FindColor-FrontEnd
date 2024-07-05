<template>
  <div v-if="displayProduct" class="product-container flex">
    <div class="product-left">
      <img :src="displayProduct.productImage" class="img_product">
    </div>
    <div class="product-right">
      <h1 class="cardo-regular">{{ displayProduct.productName }}</h1>
      <p>{{ displayProduct.productDescription }}</p>
      <label class="season_color cardo-regular" :style="{ borderColor: seasonColorLabel.borderColor }">
        {{ displayProduct.colorTone }}
      </label>
      <div class="color_select flex">
        <span v-for="(gradient, index) in combinedColorShades" :key="index" :style="{ background: gradient }" class="color-circle"></span>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const products = ref([]);
    const displayProduct = ref(null);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/data');
        products.value = response.data;
        console.log('Products fetched:', products.value);

        displayProduct.value = products.value.find(p =>
            p.productName.includes(route.params.productName)
        );

        console.log('Display product:', displayProduct.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const similarProducts = computed(() => {
      if (displayProduct.value) {
        const collectionName = extractCollectionName(displayProduct.value.productName);
        return products.value.filter(product =>
            extractCollectionName(product.productName) === collectionName &&
            product.productID !== displayProduct.value.productID
        );
      }
      return [];
    });

    const seasonColorLabel = computed(() => {
      const seasonColor = displayProduct.value?.colorTone;
      const seasonStyle = {
        Summer: { borderColor: '#CAEDFF' },
        Spring: { borderColor: '#FFC7EA' },
        Autumn: { borderColor: '#FBF0B2' },
        Winter: { borderColor: '#D8B4F8' }
      };

      if (seasonColor && seasonStyle[seasonColor]) {
        return seasonStyle[seasonColor];
      }
    });

    const combinedColorShades = computed(() => {
      const allColorShades = [];
      if (displayProduct.value) {
        // Add the color shades of the main product
        if (displayProduct.value.colorShade) {
          allColorShades.push(createGradient(extractColors(displayProduct.value.colorShade)));
        }

        // Add the color shades of similar products
        similarProducts.value.forEach(product => {
          if (product.colorShade) {
            allColorShades.push(createGradient(extractColors(product.colorShade)));
          }
        });
      }
      return allColorShades;
    });

    const extractColors = (colorShade) => {
      const matches = colorShade.match(/\((\d+),\s*(\d+),\s*(\d+)\)/g);
      if (matches) {
        return matches.map(match => {
          const [_, r, g, b] = match.match(/\((\d+),\s*(\d+),\s*(\d+)\)/).map(Number);
          return `rgb(${r}, ${g}, ${b})`;
        });
      }
      return [];
    };

    const createGradient = (colors) => {
      if (colors.length === 1) {
        return colors[0];
      } else if (colors.length === 2) {
        return `linear-gradient(to right, ${colors[0]} 50%, ${colors[1]} 50%)`;
      } else if (colors.length === 3) {
        return `conic-gradient(${colors[0]} 0% 33.33%, ${colors[1]} 33.33% 66.66%, ${colors[2]} 66.66% 100%)`;
      } else if (colors.length === 4) {
        return `conic-gradient(${colors[0]} 0% 25%, ${colors[1]} 25% 50%, ${colors[2]} 50% 75%, ${colors[3]} 75% 100%)`;
      }
    };

    const extractCollectionName = (productName) => {
      const match = productName.match(/^(.*?)(?=\s+#|$)/);
      return match ? match[0].trim() : productName;
    };

    onMounted(fetchData);

    return {
      products,
      displayProduct,
      similarProducts,
      seasonColorLabel,
      combinedColorShades
    };
  }
};
</script>

<style scoped>
.product-container {
  max-width: 80%;
  margin: auto;
  height: 800px;
}

.product-left,
.product-right {
  width: 100%;
  padding: 50px 20px;
}

.product-right h1,
p {
  margin: 10px 0;
}

.flex {
  display: flex;
  justify-content: space-between;
  gap: 5px; /* Adjusted spacing between circles */
}

.product-left img {
  border: 1px solid #ccc;
  width: 100%;
}

.product-right,
.color_select span {
  margin: 20px 0;
}

.season_color {
  padding: 5px 10px;
  border: 3px solid;
  border-radius: 30px;
  font-size: 32px;
  font-style: italic;
  font-weight: bold;
}

.color_select {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.color_select span {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 50%;
}
</style>
