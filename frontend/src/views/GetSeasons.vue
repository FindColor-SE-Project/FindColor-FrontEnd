<template>
    <div class="product-container">
        <div class="season-left">
            <!-- Left -->
        </div>

        <div class="season-right">
            <div class="card button-group ">
                <button class="cardo-regular" v-for="option in options" :key="option.season"
                    :class="{ 'active': option.season === selectedSeason }" @click="selectOption(option.season)">
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
                :to="{ name: 'seasonLayout', params: { colorTone: selectedOption.season } }">
                <button class="next-button josefin-sans-font">Next</button>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedSeason = ref(null);
const options = ref([
    { name: 'Spring', season: 'Spring', detail: 'The makeup tone is Coral, Orange, Milk Tea, Peach Pink, Salmon Pink, and Peach' },
    { name: 'Summer', season: 'Summer', detail: 'The makeup tone is Pink, Pink nude, Rosy, Pastel color including, Light Blue, Lavender except Orange' },
    { name: 'Autumn', season: 'Autumn', detail: 'The makeup tone is Orange-Red, Dark Peach, Red, Brown, Red Brick, Orange Brick, Warm Red, and Warm Orange' },
    { name: 'Winter', season: 'Winter', detail: 'The makeup tone is Berry, True Red, Burgundy, Plum, Dark Pink, and Fuchsia' },
]);

const selectedOption = computed(() => {
    return options.value.find(option => option.season === selectedSeason.value) || null;
});

// Methods
function selectOption(season) {
    selectedSeason.value = season;
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
    background-color: #EDC2D8;
    border: 1px solid #E19BBF;
    border-radius: 8px;
    padding: 10px;
    width: 500px;
    text-align: center;
    margin: 5px;
}

.button-group button {
    background-color: #fff;
    font-size: 32px;
    padding: 0 3px;
    border: none;
}

.button-group button:hover {
    font-weight: bold;
    background-color: #F9E9F1;
}

.button-group button.active  {
    background-color: #F9E9F1;
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
