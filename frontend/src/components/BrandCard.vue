<!-- BrandCard.vue -->
<template>
  <div class="card">
    <img :src="product.brandLogo" alt="ProductImage" class="card-img">
    <div class="card-body">
      <p class="card-text josefin-sans-font">{{ product.brandName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.card-text {
  text-align: center;
}

.card-img {
  width: 100%;
  height: auto;
}

.card-body {
  padding: 10px;
}
</style>
