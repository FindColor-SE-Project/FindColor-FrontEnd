<template>
    <div class="product-container flex">
        <div class="season-left">

        </div>
        <div class="season-right">
            <div class="flex">
                <div class="card button-group">
                    <button
                    v-for="option in options"
                    :key="option.value"
                    :class="{ 'active': option.value === selectedValue }"
                    @click="selectOption(option.value)"
                    >
                    {{ option.name }}
                    </button>
                </div>
                <div v-if="selectedOption" class="detail cardo-regular">
                    <h2 class="cardo-regular">{{ selectedOption.name }}</h2>
                    <p class="cardo-regular">{{ selectedOption.detail }}</p>
                </div>
                <div v-else class="detail">
                    <h2 class="cardo-regular">Select a season</h2>
                    <p class="cardo-regular">No season selected</p>
                </div>
            </div>
            <router-link v-if="selectedOption" :to="{ name: 'seasonProductView', params: { colorTone: selectedOption.value } }">
                <button class="next-button">Next</button>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedValue = ref(null);
const options = ref([
    { name: 'Spring', value: 'Spring', detail: 'The makeup tone is Coral, Orange, Milk Tea, Peach Pink, Salmon Pink, and Peach' },
    { name: 'Summer', value: 'Summer', detail: 'The makeup tone is Pink, Pink nude, Rosy, Pastel color including, Light Blue, Lavender except Orange' },
    { name: 'Autumn', value: 'Autumn', detail: 'The makeup tone is Orange-Red, Dark Peach, Red, Brown, Red Brick, Orange Brick, Warm Red, and Warm Orange' },
    { name: 'Winter', value: 'Winter', detail: 'The makeup tone is Berry, True Red, Burgundy, Plum, Dark Pink, and Fuchsia' },
]);

const selectedOption = computed(() => {
  return options.value.find(option => option.value === selectedValue.value) || null;
});

function selectOption(value) {
  selectedValue.value = value;
}

</script>

<style scoped>
.product-container {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.season-left, .season-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
}

.detail {
    text-align: center;
}

.detail h2 {
    margin: 10px;
    font-size: 24px;
    color: #333;
}

.detail p {
    margin: 0;
    font-size: 16px;
    color: #666;
}

.card {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    width: 300px;
    text-align: center;
    margin: 5px;
}

.season-select {
    font-size: 16px;
}

.large-button {
    width: 100%;
    font-size: 18px; /* Adjust font size as needed */
    padding: 10px; /* Adjust padding as needed */
}

.next-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.next-button:hover {
    background-color: #0056b3;
}
</style>
