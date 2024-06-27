<template>
    <div v-if="displayProduct" class="product-container flex">
        <div class="product-left">
            <img :src="displayProduct.productImage" class="img_product">
        </div>
        <div class="product-right">
            <h1 class="cardo-regular">{{ displayProduct.productName }}</h1>
            <p>{{ displayProduct.productDescription }}</p>
            <label class="season_color cardo-regular" :style="{ borderColor: seasonColorLabel.borderColor }">
                {{ displayProduct.colorTone }}
            </label>
            <div class="color_select flex">
                <span>
                    <img :src="displayProduct.colorShadeImage" class="color-image">
                </span>
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

        const displayProduct = computed(() => {
            return products.value.find(p =>
                p.productName.includes(route.params.productName)
            );
        });

        const seasonColorLabel = computed(() => {
            const seasonColor = displayProduct.value?.colorTone;
            const seasonStyle = {
                Summer: {
                    borderColor: '#CAEDFF'
                },
                Spring: {
                    borderColor: '#FFC7EA'
                },
                Autumn: {
                    borderColor: '#FBF0B2'
                },
                Winter: {
                    borderColor: '#D8B4F8'
                }
            };
            
            if (seasonColor && seasonStyle[seasonColor]) {
                return seasonStyle[seasonColor];
            }
        });

        onMounted(fetchData);

        return {
            products,
            displayProduct,
            seasonColorLabel
        };
    }
};
</script>

<style scoped>
.product-container {
    max-width: 80%;
    margin: auto;
    height: 800px;
}

.product-left,
.product-right {
    width: 100%;
    padding: 50px 20px;
}

.product-right h1,
p {
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

.product-right,
.color_select span {
    margin: 20px 0;
}

.season_color {
    padding: 5px 10px;
    border: 3px solid;
    border-radius: 30px;
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
}

.color_select {
    display: flex;
    align-items: center;
    margin: 20px 0;
}

.color_select span {
    margin-right: 10px; /* Adjust spacing between images */
}

.color-image {
    max-width: 50px; /* Adjust image size */
    max-height: 50px;
    object-fit: contain;
    border-radius: 50%; /* Apply border-radius if needed */
}
</style>
