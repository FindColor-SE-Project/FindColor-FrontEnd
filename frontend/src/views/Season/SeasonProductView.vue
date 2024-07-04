<template>
  <div>
    <h2 class="cardo-regular">Your season color tone is</h2>
    <h1 class="cardo-regular">{{ colorTone }}</h1>
<!--    <router-link class="josefin-sans-font category-layout" :to="{ name: 'seasonLips' }">Lips</router-link>-->
<!--    <router-link class="josefin-sans-font category-layout" :to="{ name: 'seasonBlush' }">Blush</router-link>-->
<!--    <router-link class="josefin-sans-font category-layout" :to="{ name: 'seasonEyeshadow' }">Eyeshadow</router-link>-->
    <div>
      <!-- <div v-for="color in filteredProducts" :key="color.id" class="color-option" :style="{ backgroundImage: `url(${color.colorShadeImage})` }" @click="selectColor(color)">
        {{ color.name }}
      </div> -->
    </div>
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
    const colorTone = computed(() => route.params.colorTone);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/data');
        products.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const selectColor = (color) => {
      console.log(`คุณเลือกสี: ${color.name}`);
    };

    const filteredProducts = computed(() => {
      return products.value.filter(product => product.colorTone === colorTone.value);
    });

    onMounted(fetchData);

    return {
      products,
      colorTone,
      filteredProducts,
      selectColor
    };
  }
}
</script>

<style>
.color-option {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid #000;
  background-size: cover;
  background-position: center;
}
</style>
