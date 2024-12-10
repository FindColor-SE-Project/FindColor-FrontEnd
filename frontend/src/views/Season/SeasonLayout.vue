<template>
  <div class="product-container">
    <div class="season-left">
      <!-- <SelectColorLogic @color-clicked="handleClick" /> -->
      <!-- Left -->
      <button class="change-button josefin-sans-font" @click="removeImage(image)">
        <font-awesome-icon :icon="['fas', 'trash']" /> Remove Image
      </button>

      <div v-if="image">
        <img :src="`data:image/jpeg;base64,${image.image_data}`" :alt="image.filename" />
      </div>

      <div v-if="showTestMessage" class="test-message">{{ testMessage }}</div>
    </div>

    <div class="season-right">
      <h2 class="cardo-regular">Your season color tone is</h2>
      <h1 class="cardo-regular">{{ seasonColorTone }}</h1>
      <div class="season-category">
        <router-link
          v-for="category in categories"
          :key="category.name"
          class="josefin-sans-font season-layout"
          :to="{ name: category.route }"
          active-class="active"
        >{{ category.name }}</router-link>
      </div>
      <router-view @color-clicked="updateDisplayedImage"></router-view> <!-- Listen here -->
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
// import SeasonBlush from '@/views/Season/SeasonBlush.vue';
import SelectColorLogic from '@/components/SelectColorLogic.vue';

export default {
  components: {
    SelectColorLogic
  },
  
  data() {
    return {
      seasonColorTone: null,
      image: null,
      testMessage: "abc",
      showTestMessage: false,
      categories: [
      { name: "Lips", route: "seasonLips" },
      { name: "Blush", route: "seasonBlush" },
      { name: "Eyeshadow", route: "seasonEyeshadow" }
    ]
    };
  },
  
  methods: {
    setDefaultChild() {
      const route = useRoute();
      this.seasonColorTone = route.params.seasonColorTone;
      this.$router.replace({ name: 'seasonLips', params: { seasonColorTone: this.seasonColorTone } });
    },

    async handleClick(selectColor) {
      console.log("layout check");
      this.showTestMessage = selectColor; // Ensure this is set for displaying the message

      // Fetch message from the backend when a color is clicked
      try {
        const response = await axios.post('http://localhost:8000/link_test');
        this.testMessage = response.data.message; // Update with backend response
      } catch (error) {
        console.error("Error fetching test message:", error);
      }
    },

    async fetchImage() {
      try {
        const response = await axios.get('http://localhost:8000/user');
        this.image = response.data[0];
        console.log("the image name: ", this.image);
      } catch (error) {
        console.error(error, "Error, You didn't connect with the database.", error);
        this.$router.push({ name: 'DatabaseError' });
      }
    },

    async fetchSeasonColorTone() {
      try {
        const response = await axios.get('http://localhost:8000/user/seasonColorTone');
        // console.log("Fetched seasonColorTone:", response.data);
        this.seasonColorTone = response.data.seasonColorTone;
      } catch (error) {
        console.error("Error fetching season color tone:", error);
      }
    },

    async removeImage() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you cannot recover this image!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            // เรียกใช้ API เพื่อลบข้อมูลทั้งหมด
            const response = await axios.delete(`http://localhost:8000/user`);

            // แสดง Noti ว่าลบสำเร็จ
            swal("Deleted!", response.data.message, "success");

            // หลังจากลบข้อมูลเสร็จสิ้น กลับไปที่หน้า Upload
            this.$router.push('/upload');
          } catch (error) {
            // หากเกิดข้อผิดพลาด แสดงข้อความเตือน
            console.error(error);
            swal("Error", "Failed to delete the image. Please try again.", "error");
          }
        } else {
          // แสดงข้อความเมื่อผู้ใช้ยกเลิกการลบ
          swal("Cancelled", "Your image is safe!", "info");
          }
      });
    }
  },
  
  mounted() {
    this.setDefaultChild();
    this.fetchImage();
    this.fetchSeasonColorTone();
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
