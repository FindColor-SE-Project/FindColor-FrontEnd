<script setup>
import { ref } from 'vue'
</script>

<template>
    <div class="upload__container">
            <div class="upload__area">
                <div class="icon__upload"><font-awesome-icon icon="cloud-arrow-up" /></div>
                <button class="josefin-sans-font">Choose Image to Upload</button>
                <input type="file" hidden>
                <button class="josefin-sans-font">Take a photo to Upload</button>
                <p class="josefin-sans-font">or Drag and Drop image to Upload</p>
            </div>
    </div>

</template>

<style>
.upload__container {
    height: 90vh;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
}

.upload__area {
    width: 850px;
    height: 500px;
    padding: 30px;
    text-align: center;
    border-radius: 20px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    border: #EDC2D8 dashed 5px;
}

.icon__upload {
    font-size: 70px;
    color: #8ABAD3;
}

button {
    font-size: 28px;
    margin: 5px 0;
    padding: 6px 10px;
    border: black solid 1px;
    border-radius: 20px;
    background-color: #EDC2D8;
}

p {
    font-size: 24px;
    margin: 5px 0;
}

button:hover {
    background-color: #FCF6F5;
}
</style>