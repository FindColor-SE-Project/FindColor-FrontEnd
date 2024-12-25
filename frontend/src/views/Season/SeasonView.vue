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
      <h2 class="cardo-regular">Your Season Color Tone is</h2>
      <h1 class="cardo-regular">{{ seasonColorTone }}</h1>
      <div class="season-category">
        <button class="josefin-sans-font category-selected" :class="{ active: currentProductCategory === 'Lips' }"
          v-on:click="setProductCategory('Lips')"> Lips
        </button>
        <button class="josefin-sans-font category-selected" :class="{ active: currentProductCategory === 'Blush' }"
          v-on:click="setProductCategory('Blush')"> Blush
        </button>
        <button class="josefin-sans-font category-selected" :class="{ active: currentProductCategory === 'Eyeshadow' }"
          v-on:click="setProductCategory('Eyeshadow')"> Eyeshadow
        </button>
      </div>
      <router-view @color-clicked="updateDisplayedImage"></router-view> <!-- Listen here -->

      <div class="color_select" v-if="groupedByProduct().length">
        <div class="color-group-container">
          <div v-for="([productName, colorGroups], index) in groupedByProduct()" :key="index" class="color-group">
            <div v-for="(colors, subIndex) in colorGroups" :key="subIndex" class="color-subgroup">
              <span v-for="(color, colorIndex) in colors" :key="colorIndex" :style="{ background: color }"
                @click="handleColorClick(productName, color)" class="color-circle"
                :class="{ selected: isSelectedColor(color) }">
              </span>
            </div>

            <!-- vertical line -->
            <div v-if="index < groupedByProduct().length - 1" class="vertical-line"></div>
          </div>
        </div>
        <div class="product-card-container" v-if="currentProduct">
          <ProductPreview :product="currentProduct" />
        </div>
      </div>
      <div v-else class="for-error cardo-regular">Sorry, No color shades available</div>
    </div>
  </div>
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
      currentProduct: null,
      productColor: null,
      seasonColorTone: null,
      image: [],
      currentProductCategory: 'Lips'
    };
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/data');
        this.products = response.data;
        console.log('Products fetched:', this.products);

        this.currentProduct = this.products.find((p) =>
          p.productName.includes(this.$route.params.productName)
        );

        console.log('Display product:', this.currentProduct);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    },

    setProductCategory(productCategory) {
      this.currentProductCategory = productCategory
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
      const isSameProduct = this.currentProduct?.productName === productName;
      this.currentProduct = isSameProduct && this.productColor === color ? null : 
          this.products.find(product => product.productName === productName);
      this.productColor = isSameProduct ? null : color;

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
          const response = await axios.post('http://localhost:8000/apply-lips', {
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
      return this.productColor === color;
    },

    fileteredProduct() {
      return this.products.filter(
        (product) =>
          product.seasonColorTone === this.seasonColorTone &&
          product.productCategory === this.currentProductCategory
      );
    },

    groupedByProduct() {
      const productMap = new Map();

      this.fileteredProduct().forEach((product) => {
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

  mounted() {
    const route = useRoute();
    this.seasonColorTone = route.params.seasonColorTone;
    this.fetchData();
    this.fetchImage();
    this.fetchSeasonColorTone();
    this.getImage();
  }
};
</script>

<style scoped>
.product-container {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.season-left,
.season-right {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 20px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
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

.season-right h2 {
  font-size: 28px;
}

.season-right h1 {
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

.category-select {
  text-align: center;
  padding: 20px;
}

.category-selected {
  font-size: 24px;
  font-style: #000;
  margin: 0 10px;
  border: 1px solid #EDC2D8;
  background-color: #fff;
  text-decoration: none;
  color: inherit;
  padding: 5px 10px;
  transition: all 0.35s;
}

.category-selected.active {
  background-color: #EDC2D8;
}

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
