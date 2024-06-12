<script setup>
import { ref } from 'vue'
</script>

<template>
    <div class="main">
        <div class="home__data">
            <div class="home__content">
                <h2 class="cardo-regular">Hello, Beautiful</h2>
                <h1 class="lora-font">FindColor</h1>
                <p class="cardo-regular">a website collects cosmetic brands for users <br> to find the data easily and comfortably</p>
            </div>
        </div>
    </div>

    <div class="home__category">
        <h2 class="title cardo-regular">Seasons Color Tone</h2>
        <div class="category__row">
            <div class="category__card">
                <img src="https://i.pinimg.com/736x/e9/c0/3b/e9c03b3ff958ec23633d6d73446f7f39.jpg" width="400" height="400" alt="category">
                <h2>Lips</h2>
            </div>
            <div class="category__card">
                <img src="https://i.pinimg.com/564x/bb/6c/4e/bb6c4ee1b969e837fa6d6d74adce8805.jpg" width="400" height="400" alt="category">
                <h2>Blush</h2>
            </div>
            <div class="category__card">
                <img src="https://i.pinimg.com/564x/b8/04/ff/b804fff6f29cb24926e0bcd1a2f2ebc6.jpg" width="400" height="400" alt="category">
                <h2>Eyeshadow</h2>
            </div>
        </div>
    </div>
</template>

<style>
.main {
    background-image: url(@/assets/pic.jpeg);
    width: 100%;
    height: 800px;
    /* object-fit: cover;
    object-position: center; */
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.home__data {
    padding-block: 10rem;
    display: grid;
}

.home__content h2 {
    font-weight: 300;
    font-size: 60px;
}

.home__content h1 {
    font-size: 120px;
    font-weight: 100;
}

.home__content p {
    font-size: 28px;
}

@media (width > 768px) {
    .home__data {
        padding-block: 10%;
        grid-template-columns: repeat(2, 2fr);
    }

    .home__content {
        margin-left: 15%;
        grid-column: 2/3;
    }

    .category__row {
        grid-template-columns: repeat(3, 2fr);
    }
}

.title {
    text-align: center;
    margin: 5%;
    font-size: 72px;
    font-style: italic;
    font-weight: bold;
}

.category__row {
    margin-top: 4rem;
    display: grid;
    gap: 1rem;
    text-align: center;
}

.category__card img {
    margin-bottom: 1rem;
    border: 2px solid black;
}

.category__card h2 {
    font-size: 32px;
    font-weight: 500;
}

</style>