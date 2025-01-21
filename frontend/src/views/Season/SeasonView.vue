<template>
  <div class="product-container">
    <!-- Left Section -->
    <div class="season-left">
      <button class="change-button josefin-sans-font" @click="removeImage(image)">
        <font-awesome-icon :icon="['fas', 'trash']" /> Remove Image
      </button>

      <div v-if="image" class="image-container">
        <img :src="`data:image/jpeg;base64,${image.image_data}`" alt="Processed Image" />

        <!-- Loading message -->
        <p v-if="loadingImage" class="loading-message">Loading...</p>
      </div>
    </div>

    <!-- Right Section -->
    <div class="season-right">
      <h2 class="cardo-regular">Your Season Color Tone is</h2>

      <!-- Show seasonColorTone or a loading message -->
      <h1 class="cardo-regular">
        <span v-if="loading">Loading your season tone...</span>
        <span v-else>{{ seasonColorTone || "Unknown" }}</span>
      </h1>

      <!-- Category Buttons -->
      <div class="season-category">
        <button
          v-for="category in ['Lips', 'Blush', 'Eyeshadow']"
          :key="category"
          class="josefin-sans-font category-selected"
          :class="{ active: currentProductCategory === category }"
          @click="setProductCategory(category)"
        >
          {{ category }}
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="loading">Loading...</div>

      <!-- Grouped Colors -->
      <div class="color_select" v-else-if="groupedByProduct.length">
        <div class="color-group-container">
  <div class="color-list bb">
    <!-- Loop through flattened colors grouped by product -->
    <template v-for="([productName, colors], index) in flattenedGroupedColors">
      <!-- Render each color for the current product -->
      <span
        v-for="(color, colorIndex) in colors"
        :key="`${productName}-${colorIndex}`"
        :style="{ background: color }"
        class="color-circle"
        @click="handleColorClick(productName, color)"
        :class="{ selected: isSelectedColor(color) }"
      ></span>

      <!-- Vertical Line After Each Product -->
      <div
        v-if="index < flattenedGroupedColors.length - 1"
        class="vertical-line"
      ></div>
    </template>
  </div>
</div>


        <!-- Product Preview -->
        <div class="product-card-container" v-if="currentProduct">
          <ProductPreview :product="currentProduct" />
        </div>
      </div>

      <!-- Null seasonColorTone Message -->
      <div v-else-if="seasonColorTone === null" class="for-error cardo-regular">
        Please refresh the webpage to load your season color tone.
      </div>

      <!-- Error Message -->
      <div v-else class="for-error cardo-regular">Sorry, No color shades available</div>
    </div>
  </div>
</template>

<script>
import ProductPreview from "@/components/ProductPreview.vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  props: ["colors"],

  components: {
    ProductPreview,
  },

  data() {
    return {
      loading: true, // Loading state for the page
      loadingImage: false, // Loading state for image processing
      products: [], // Product data fetched from the backend
      currentProduct: null, // Currently selected product
      productColor: null, // Currently selected color
      seasonColorTone: null, // User's season color tone
      image: null, // Processed image
      savedImage: null, // Original uploaded image
      currentProductCategory: "Lips", // Default product category
    };
  },

  computed: {
    // Groups products by name and organizes colors into color groups
    groupedByProduct() {
      if (!this.products.length || !this.seasonColorTone) return []; // Handle empty or uninitialized data

      const productMap = new Map();

      // Filter products by season tone and current category
      this.filteredProduct().forEach((product) => {
        if (product.colorShade) {
          const colors = this.extractColors(product.colorShade); // Extract colors
          const productName = product.productName;

          if (!productMap.has(productName)) {
            productMap.set(productName, []);
          }
          productMap.get(productName).push(colors); // Add color groups
        }
      });

      // Convert Map to sorted array and return
      return Array.from(productMap.entries()).sort(([a], [b]) => a.localeCompare(b));
    },

    // Flatten grouped products and their colors
    flattenedGroupedColors() {
      // Flatten the grouped colors while keeping their product association
      return this.groupedByProduct.map(([productName, colorGroups]) => {
        const flattenedColors = colorGroups.flat(); // Flatten nested color groups
        return [productName, flattenedColors]; // Return product name with flattened colors
      });
    },
  },

  methods: {
    // Fetch all product data from the backend
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/data");
        this.products = response.data;
        console.log("Products fetched:", this.products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },

    // Fetch the uploaded image
    async fetchImage() {
      try {
        const response = await axios.get("http://localhost:8000/user");
        this.savedImage = response.data[0]; // Original image
        this.image = { ...this.savedImage }; // Processed image
        console.log("Image fetched:", this.image);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    },

    // Fetch the user's season color tone
    async fetchSeasonColorTone() {
      try {
        const response = await axios.get("http://localhost:8000/user/seasonColorTone");
        this.seasonColorTone = response.data.seasonColorTone;
        console.log("Season color tone fetched:", this.seasonColorTone);
      } catch (error) {
        console.error("Error fetching season color tone:", error);
      }
    },

    // Initialize the page by fetching all required data
    async initializePage() {
      try {
        await Promise.all([
          this.fetchData(),
          this.fetchImage(),
          this.fetchSeasonColorTone(),
        ]);
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        this.loading = false; // Disable loading state
      }
    },

    // Filter products based on the current season color tone and category
    filteredProduct() {
      return this.products.filter(
        (product) =>
          product.seasonColorTone === this.seasonColorTone &&
          product.productCategory === this.currentProductCategory
      );
    },

    // Extract RGB colors from a colorShade string
    extractColors(colorShade) {
      const matches = colorShade.match(/\((\d+),\s*(\d+),\s*(\d+)\)/g);
      if (!matches) return []; // Return empty array if no matches found

      return matches.map((match) => {
        const [r, g, b] = match.match(/\d+/g).map(Number);
        return `rgb(${r}, ${g}, ${b})`;
      });
    },

    // Set the selected product category
    setProductCategory(category) {
      this.currentProductCategory = category;
      console.log("Category changed to:", category);
    },

    // Handle a color click event
    async handleColorClick(productName, color) {
      // Check if the clicked color is already selected
      if (this.currentProduct?.productName === productName && this.productColor === color) {
        this.image.image_data = this.savedImage?.image_data || ""; // Reset to original image
        this.productColor = null;
        this.currentProduct = null;
        return;
      }

      // Update the current product and selected color
      this.currentProduct = this.products.find((p) => p.productName === productName);
      this.productColor = color;

      if (this.image && color) {
        const [r, g, b] = color.match(/\d+/g).map(Number); // Extract RGB values
        this.loadingImage = true; // Start loading indicator for image processing

        try {
          const response = await axios.post(
            `http://localhost:8000/apply-${this.currentProductCategory.toLowerCase()}`,
            { r, g, b, image: this.savedImage.image_data }
          );
          this.updateDisplayedImage(response.data.image); // Update the processed image
        } catch (error) {
          console.error(`Error applying ${this.currentProductCategory} color:`, error);
        } finally {
          this.loadingImage = false; // Stop loading indicator
        }
      }
    },

    // Check if a color is selected
    isSelectedColor(color) {
      return this.productColor === color;
    },

    // Remove the uploaded image
    async removeImage(image) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you cannot recover this image!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            const response = await axios.delete(`http://localhost:8000/user`);
            swal("Deleted!", response.data.message, "success");
            this.$router.push("/upload"); // Redirect to the upload page
          } catch (error) {
            console.error("Error deleting image:", error);
            swal("Error", "Failed to delete the image. Please try again.", "error");
          }
        } else {
          swal("Cancelled", "Your image is safe!", "info");
        }
      });
    },

    // Update the displayed processed image
    updateDisplayedImage(newImage) {
      if (this.image) this.image.image_data = newImage || "";
    },
  },

  watch: {
    // Watch for changes in the route's season color tone parameter
    "$route.params.seasonColorTone": async function (newSeasonColorTone) {
      if (newSeasonColorTone && newSeasonColorTone !== this.seasonColorTone) {
        this.loading = true; // Show loading indicator during data fetch
        this.seasonColorTone = newSeasonColorTone;

        try {
          await this.fetchSeasonColorTone();
        } finally {
          this.loading = false;
        }
      }
    },
  },

  async mounted() {
    await this.initializePage(); // Fetch all necessary data on mount
  },
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
  height: 70vh;
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

.vertical-line {
  width: 1px;
  background-color: #000; /* Black vertical line */
  height: 50%; /* Stretch line to match row height */
  align-self: center;
  margin: 0 auto; /* Center the line horizontally */
  grid-column: span 1; /* Ensure it takes up a single column in the grid */
}

.product-card-container {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.color-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: border-color 0.3s;
  cursor: pointer;
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

.color-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr)); /* Auto-adjust columns */
  gap: 40px 20px; /* Space between items */
  max-width: 800px; /* Restrict the width of the container */
  max-height: 300px; /* Fixed height */
  overflow-y: auto; /* Enable scrolling for vertical overflow */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  padding: 30px 20px 30px 25px;
  scrollbar-width: thin; /* Thin scrollbar for modern browsers */
}

.color-list::-webkit-scrollbar {
  width: 6px;
}

.color-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.color-list::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

.bb{
  border: #000;
  background: #D3D3D3;
  border-radius: 10px;
}

.loading-message {
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-top: 8px;
}

</style>
