<script setup>
import { ref } from 'vue'
</script>

<template>
    <div class="main">
        <div class="home__data">
            <div class="home__content">
                <h2>Welcome, Beautiful</h2>
                <h1>FindColor</h1>
                <p>a web server collects cosmetic brands for users <br> to find the data easily and comfortably</p>
            </div>
        </div>
    </div>

    <div class="home__category">
        <h2 class="title">Category</h2>
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
    background-image: url(https://lexlovescouture.files.wordpress.com/2016/03/perfect-everyday-makeup1.jpg?w=2000&h=1000&crop=1);
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
    font-size: 54px;
}

.home__content h1 {
    font-size: 100px;
    font-weight: 100;
}

.home__content p {
    font-size: 20px;
}

@media (width > 768px) {
    .home__data {
        padding-block: 14%;
        grid-template-columns: repeat(2, 2fr);
    }

    .home__content {
        margin-left: 10%;
        grid-column: 2/3;
    }

    .category__row {
        grid-template-columns: repeat(3, 2fr);
    }
}

.title {
    text-align: center;
    margin: 5%;
    font-size: 60px;
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