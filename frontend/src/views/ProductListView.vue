<template>
  <div>
    <h1>Products for {{ brandName }}</h1>
    <div class="product-list">
      <BrandCard v-for="product in filteredProducts" :key="product.productID" :product="product" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import BrandCard from '@/components/BrandCard.vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

export default {
  components: {
    BrandCard
  },
  setup () {
    const route = useRouter();
    const products = ref([]);
    const brandName = computed(() => route.params.brandName);

    const filteredProducts = computed(() => {
      return products.value.filter(product => product.brandName === brandName.value);
    });

    const fetchProdutcs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/data');
        products.value = response.data; // อัพเดตค่า products
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchProdutcs);

    watch(
      () => route.params.brandName,
      async (newBrandName, oldBrandName) => {
        if (newBrandName !== oldBrandName) {
          await fetchProdutcs();
        }
      }
    );

    return {
      products,
      brandName,
      filteredProducts
    };
  }

  // data() {
  //   return {
  //     products: [],  // ดึงข้อมูลผลิตภัณฑ์ทั้งหมดจาก API มาที่นี่
  //     brandName: route.params.brandName
  //   };
  // },
  // computed: {
  //   filteredProducts() {
  //     return this.products.filter(product => product.brandName === this.brandName);
  //   }
  // },
  // mounted() {
  //   axios.get('http://localhost:8000/data')
  //     .then(response => {
  //       this.products = response.data;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
  // // watch: {
  // //   '$route.params.brandName'(newBrandName) {
  // //     this.brandName = newBrandName;
  // //     // อัพเดทข้อมูลหรือดำเนินการอื่น ๆ ตามที่ต้องการเมื่อเปลี่ยนแปลง brandName
  // //   }
  // // }
  // watch(
  //   () => route.params.brandName,
  //   async newBrandName => {
  //     await fetc
  //   }
  // )
}

</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
