<template>
    <div class="product-container">
        <div class="season-left">
            <!-- Left -->
        </div>

        <div class="season-right">
            <div class="card button-group ">
                <button class="cardo-regular" v-for="option in options" :key="option.seasonColorTone"
                    :class="{ 'active': option.seasonColorTone === selectedSeason }" @click="selectOption(option.seasonColorTone)">
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
            <router-link v-if="selectedOption"
                :to="{ name: 'seasonLayout', params: { seasonColorTone: selectedOption.seasonColorTone } }">
                <button class="next-button josefin-sans-font">Next</button>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedSeason = ref(null);
const options = ref([
    { name: 'Spring', seasonColorTone: 'Spring', detail: 'The makeup tone is Coral, Orange, Milk Tea, Peach-Pink, Salmon-Pink, Salmon, Coral-Pink, and Peach' },
    { name: 'Summer', seasonColorTone: 'Summer', detail: 'The makeup tone of Summer is Pink Nude, Rosy, Pink, Lilac, Medium Pink, Light Rose, Light Pink, and Lavender' },
    { name: 'Autumn', seasonColorTone: 'Autumn', detail: 'The makeup tone is Orange-Red, Dark Peach, Red, Brown, Red Brick, Brick Orange, Tomato, and Brown Brick' },
    { name: 'Winter', seasonColorTone: 'Winter', detail: 'The makeup tone is Dark Pink, Burgundy, Berry, True Red, Plum, Fuchsia, Magenta, and Hot Pink' },
]);

const selectedOption = computed(() => {
    return options.value.find(option => option.seasonColorTone === selectedSeason.value) || null;
});

// Methods
function selectOption(seasonColorTone) {
    selectedSeason.value = seasonColorTone;
}

</script>

<style scoped>
.product-container {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.season-left,
.season-right {
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
    width: 50%;
}

.detail h2 {
    margin: 10px;
    font-size: 32px;
    color: #333;
}

.detail p {
    margin: 0;
    font-size: 24px;
    color: #666;
}

.card {
    background-color: #F9E9F1;
    border-radius: 5px;
    padding: 10px;
    width: 580px;
    text-align: justify;
    margin: 5px;
}

.button-group button {
    background-color: #fff;
    font-size: 32px;
    padding: 0 10px;
    margin: 5px;
    border: 3px solid #EDC2D8;
    border-radius: 5px;
}

.button-group button:hover {
    font-weight: bold;
    background-color: #EDC2D8;
}

.button-group button.active  {
    background-color: #EDC2D8;
    font-weight: bold;
}

.season-select {
    font-size: 16px;
}

.large-button {
    width: 100%;
    font-size: 18px;
    padding: 10px;
}

.next-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 20px;
    background-color: #8ABAD3;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.next-button:hover {
    background-color: #5299be;
}
</style>
