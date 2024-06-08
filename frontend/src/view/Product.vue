<template>
  <div>
    <h2 class="title cardo-regular">Brands</h2>
    <BrandCard v-for="product in limitedProducts" :key="product.productID" :product="product" />
  </div>
</template>

<script>
import BrandCard from '@/components/BrandCard.vue';
import axios from 'axios';

export default {
  components: {
    BrandCard
  },
  data() {
    return {
      products: []  // ดึงข้อมูลผลิตภัณฑ์จาก API มาที่นี่
    };
  },
  computed: {
    limitedProducts() {
      const brandSet = new Set();
      const limitedProducts = [];
      
      for (const product of this.products) {
        if (!brandSet.has(product.brandName)) {
          brandSet.add(product.brandName);
          limitedProducts.push(product);
        }
        
        if (limitedProducts.length === 5) break;  // หยุดเมื่อได้ครบ 5 การ์ด
      }
      
      return limitedProducts;
    }
  },
  mounted() {
    axios.get('http://localhost:8000/data')
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
