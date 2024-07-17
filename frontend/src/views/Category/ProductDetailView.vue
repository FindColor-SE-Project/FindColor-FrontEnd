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
      <div class="color_select">
                <span
                    v-for="(product, index) in collectionProductsWithGradients"
                    :key="index"
                    :style="{ background: product.gradient, borderColor: isSelectedProduct(product) ? 'black' : 'transparent' }"
                    class="color-circle"
                    @click="updateDisplayProduct(product)"
                ></span>
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
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
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
        router.push({ name: 'DatabaseError' });
      }
    };

    const updateDisplayProduct = (product) => {
      displayProduct.value = product;
    };

    const collectionProducts = computed(() => {
      if (displayProduct.value) {
        const collectionName = extractCollectionName(displayProduct.value.productName);
        return products.value.filter(product =>
            extractCollectionName(product.productName) === collectionName
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

    const collectionProductsWithGradients = computed(() => {
      return collectionProducts.value.map(product => ({
        ...product,
        gradient: createGradient(extractColors(product.colorShade))
      }));
    });

    const isSelectedProduct = (product) => {
      return displayProduct.value && product.productID === displayProduct.value.productID;
    };

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
      collectionProductsWithGradients,
      seasonColorLabel,
      updateDisplayProduct,
      isSelectedProduct
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
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
}

.color_select span.selected {
  border-color: black;
}
</style>
