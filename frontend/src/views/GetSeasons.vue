<template>
    <div class="season_left">

    </div>
    <div class="season_right">
        <div class="card flex justify-center">
            <SelectButton v-model="value" :options="options" optionLabel="name" dataKey="value" aria-labelledby="custom" />
        </div>
        <div v-if="selectedOption" class="detail">
        {{ selectedOption.detail }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SelectButton from 'primevue/selectbutton';

const value = ref(null);
const options = ref([
    { name: 'Spring', value: 1, detail: 'The makeup tone is Coral, Orange, Milk Tea, Peach Pink, Salmon Pink, and Peach' },
    { name: 'Summer', value: 2, detail: 'The makeup tone is Pink, Pink nude, Rosy, Pastel color including, Light Blue, Larvender except Orange' },
    { name: 'Autumn', value: 3, detail: 'The makeup tone is Orange-Red, Dark Peach, Red, Brown, Red Brick, Orange Brick, Warm Red, and Warm Orange' },
    { name: 'Winter', value: 4, detail: 'The makeup tone is Berry, True Red, Burgundy, Plum, Dark Pink, and Fuchsia' },
]);

const selectedOption = computed(() => {
    return options.value.find(option => option.value === value.value);
});

</script>

<style scoped>
.detail {
    margin-top: 20px;
    font-size: 16px;
    color: #333;
}

</style>
