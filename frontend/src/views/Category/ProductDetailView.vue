<template>
    <div v-if="product" class="product-container flex">
        <div class="product-left">
            <img :src="product.productImage" class="img_product">
        </div>
        <div class="product-right">
            <h1 class="cardo-regular">{{ product.productName }}</h1>
            <p>{{ product.productDescription }}</p>
            <label class="season_color cardo-regular">{{ product.colorTone }}</label>
            <div class="color_select flex">
                <span :style="{ backgroundColor: product.colorShade }"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const products = ref([]);

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/data');
                products.value = response.data;
            } catch (error) {
                console.error(error);
            }
        };

        const product = computed(() => {
            return products.value.find(p => 
            p.brandName === route.params.brandName && 
            p.productName === route.params.productName);
        });

        onMounted(fetchData);

        return {
            products,
            product    
        };
    }
}
</script>

<style scoped>
.product-container {
    max-width: 80%;
    margin: auto;
    height: 800px;
    /* margin-top: 5%; */
    /* background-color: yellowgreen; */
}

.product-left, .product-right {
    width: 100%;
    padding: 50px 20px;
}

.product-right h1,p  {
    margin: 10px 0;
}

.flex {
    display: flex;
    justify-content: space-between;
}

.product-left img {
    border: 1px solid #ccc;
    width: 100%;
}

.product-right, .color_select span {
    margin: 20px 0;
}

.product-right h1  {
    font-size: 50px;
}

.season_color {
    padding: 5px 10px;
    border: pink 2px solid;
    border-radius: 30px;
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
}

.color_select span {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
}

</style>