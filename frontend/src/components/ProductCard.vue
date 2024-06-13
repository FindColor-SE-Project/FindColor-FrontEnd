<template>
  <div class="card">
    <router-link :to="{ name: 'productListView', params:{brandName: product.brandName} }">
      <img :src="product.productImage" alt="ProductImage" class="card-img">
    </router-link>    
    <div class="card-body">
      <p class="josefin-sans-font">{{ product.productName }}</p>
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
  border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;
  justify-items: center;
  justify-content: center;
}

.card-img {
  width: 100%;
  height: auto;
}

.card-body {
  padding: 10px;
}

.card:hover {
  box-shadow: 2px 2px 5px #ccc;
}

.card-body p {
  font-size: 22px;
  margin: 5px;
}
</style>
