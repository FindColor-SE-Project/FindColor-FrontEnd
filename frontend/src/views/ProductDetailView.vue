<template>
  <div>
    <div v-for="product in limitedProducts" :key="product.id">
      <h2 class="card-title cardo-regular">{{ product.brandName }}</h2>
      <!-- You can add more product details here -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductListView',
  props: {
    brandName: {
      type: String,
      required: true
    }
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
        console.error(error);
      });
  }
}
</script>
