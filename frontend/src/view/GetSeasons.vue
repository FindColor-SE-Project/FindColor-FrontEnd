<script setup>
import { ref } from 'vue'
</script>

<template>
    <div class="upload__container">
            <div class="upload__area">
                <div class="icon__upload"><font-awesome-icon icon="cloud-arrow-up" /></div>
                <button>Choose Image to Upload</button>
                <input type="file" hidden>
                <button>Take a photo to Upload</button>
                <p>or Drag and Drop image to Upload</p>
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
    background: powderblue;
    text-align: center;
    border-radius: 20px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;

}

.icon__upload {
    font-size: 65px;
}

button {
    font-size: 28px;
    margin: 5px 0;
}

p {
    font-size: 24px;
    margin: 5px 0;
}

</style>