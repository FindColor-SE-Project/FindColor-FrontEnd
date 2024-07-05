<template>
    <div>
      <h2>Eyeshadow Products</h2>
      <p v-for="product in products" :key="product.id">{{ product.name }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: ['products']
  }
  </script>
  