<script>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar,
  }
}
</script>


<template>
  <div id="app">
    <Navbar/>
    <RouterView/>    
  </div>
</template>