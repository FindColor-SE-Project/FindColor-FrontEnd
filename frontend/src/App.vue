<script>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue';
import BrandListView from '@/views/BrandListView.vue';
export default {
  components: {
    Navbar,
    BrandListView
  }
}
</script>


<template>
  <div id="app">
    <Navbar/>
    <RouterView/>    
  </div>
</template>