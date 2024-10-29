<template>
  <div class="product-container">
    <div class="season-left">
      <!-- Left -->
      <button class="change-button josefin-sans-font" @click="changeImage(images.id)">
        <font-awesome-icon :icon="['fas', 'trash']" /> Change Image
      </button>

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
        const response = await axios.get('http://localhost:8000/user');
        console.log(response.data);  // Log ข้อมูลที่ได้มาเพื่อตรวจสอบ
        this.images = response.data;
      } catch (error) {
        console.error(error, "Error, You didn't connect with the database.");
        this.$router.push({ name: 'DatabaseError' });
      }
    },

    async changeImage() {
      try {
          // สมมติว่า user_id ที่จะลบคือ 1 (คุณสามารถปรับให้เป็น user_id ที่ต้องการได้)
          const response = await axios.delete(`http://localhost:8000/user/1`);
          console.log(response.data.message);
          
          // หลังจากลบข้อมูลเสร็จสิ้น กลับไปที่หน้า Upload
          this.$router.push('/upload');
      } catch (error) {
          console.error("Error deleting image:", error.response);
          alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    },

    async changeImage() {
      try {
        // เรียกใช้ API เพื่อลบข้อมูลทั้งหมด
        const response = await axios.delete(`http://localhost:8000/user`);
        console.log(response.data.message);
                
        // หลังจากลบข้อมูลเสร็จสิ้น กลับไปที่หน้า Upload
        this.$router.push('/upload');
      } catch (error) {
        console.error("Error deleting images:", error.response);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
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

.change-button {
  font-size: 18px;
  margin: 0 10px;
  border: 1px solid #000;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #fff;
  align-self: flex-end;
}

.change-button:hover {
  color: #fff;
  background-color: #2E2E2E;
  border: 1px solid #2E2E2E;
}
</style>
