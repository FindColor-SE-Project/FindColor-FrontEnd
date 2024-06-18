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

    <div class="home_season">
        <h2 class="title cardo-regular">Seasons Color Tone</h2>
        <div class="season_row">
            <div class="season_card">
                <img width="96" height="96" src="https://img.icons8.com/color/96/spring.png" alt="spring"/>
                <h2>Spring</h2>
            </div>
            <div class="season_card">
                <img width="96" height="96" src="https://img.icons8.com/color/96/summer--v1.png" alt="summer--v1"/>
                <h2>Summer</h2>
            </div>
            <div class="season_card">
                <img width="96" height="96" src="https://img.icons8.com/color/96/autumn.png" alt="autumn"/>
                <h2>Autumn</h2>
            </div>
            <div class="season_card">
                <img width="96" height="96" src="https://img.icons8.com/color/96/winter--v1.png" alt="winter--v1"/>
                <h2>Winter</h2>
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

}

.title {
    text-align: center;
    margin: 5%;
    font-size: 72px;
    font-style: italic;
    font-weight: bold;
}

.home_season {
    display: grid;
    gap: 1rem;
    justify-items: center;
    padding: 4rem;
    margin: 4rem;
}

.season_card {
    padding: 4rem;
    margin: 4rem;
    text-align: center;
    border: 2px solid black;
    float: left;
}

.season_card img {
    margin-bottom: 1rem;
    justify-content: space-around;
}

.season_card h2 {
    font-size: 32px;
    font-weight: 500;
}

</style>