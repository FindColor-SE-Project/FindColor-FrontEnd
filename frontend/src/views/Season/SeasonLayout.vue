<template>
  <div class="product-container">
    <div class="season-left">
      <!-- Left -->
      <div v-for="image in images" :key="image.filename">
        <img :src="`data:image/jpeg;base64,${image.filepath}`" :alt="image.filename" />
      </div>
    </div>

    <div class="season-right">
      <h2 class="cardo-regular">Your season color tone is</h2>
      <h1 class="cardo-regular">{{ seasonColorTone }}</h1>
      <div class="season-category">
        <router-link class="josefin-sans-font season-layout" :to="{ name: 'seasonLips' }" active-class="active">Lips</router-link>
        <router-link class="josefin-sans-font season-layout" :to="{ name: 'seasonBlush' }" active-class="active">Blush</router-link>
        <router-link class="josefin-sans-font season-layout" :to="{ name: 'seasonEyeshadow' }" active-class="active">Eyeshadow</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      seasonColorTone: null,
      images: []
    };
  },
  
  methods: {
    setDefaultChild() {
      const route = useRoute();
      this.seasonColorTone = route.params.seasonColorTone;
      this.$router.replace({ name: 'seasonLips', params: { seasonColorTone: this.seasonColorTone } });
    },

    async displayImage() {
      try {
        const response = await axios.get('http://localhost:8000/upload');
        console.log(response.data);  // Log ข้อมูลที่ได้มาเพื่อตรวจสอบ
        this.images = response.data;
      } catch (error) {
        console.error(error, "Error, You didn't connect with the database.");
        this.$router.push({ name: 'DatabaseError' });
      }
    }
  },
  
  mounted() {
    this.setDefaultChild();
    this.displayImage();
  }
}
</script>


<style>
.product-container {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.season-left, .season-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
}

.season-category {
  padding: 15px;
}

.season-layout {
  font-size: 24px;
  font-style: #000;
  margin: 0 10px;
  border: 1px solid #8ABAD3;
  text-decoration: none; 
  color: inherit;
  padding: 5px 10px;
}

.season-layout.active {
  background-color: #8ABAD3;
}

.season-right h2{
  font-size: 28px;
}

.season-right h1{
  font-size: 42px;
}
</style>
