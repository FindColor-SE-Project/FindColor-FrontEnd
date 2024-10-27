<template>
    <div class="main">
        <div class="home__data">
            <div class="home__content">
                <img src="../assets/header.png" class="header_img"/>
                <div class="header_text">
                    <h2 class="cardo-regular" style="font-style: italic">Hello, Beautiful</h2>
                    <h1 class="lora-font">FindColor</h1>
                    <p class="cardo-regular">a website collects cosmetic brands for users <br> to find the data easily and comfortably</p>
                </div>
            </div>
        </div>
    </div>

    <div class="home_season">
        <h2 class="title cardo-regular">Seasons Color Tone</h2>
        <div class="season_row">
            <div class="season_card spring">
                <img width="96" height="96" src="https://img.icons8.com/color/96/spring.png" alt="spring"/>
                <h2 class="cardo-regular">Spring</h2>
                <p class="cardo-regular">The makeup tone is Coral, Orange, Milk Tea, Peach Pink, Salmon Pink, and Peach</p>
            </div>
            <div class="season_card summer">
                <img width="96" height="96" src="https://img.icons8.com/color/96/summer--v1.png" alt="summer--v1"/>
                <h2 class="cardo-regular">Summer</h2>
                <p class="cardo-regular">The makeup tone is Pink, Pink nude, Rosy, Pastel color including, Light Blue, Larvender except Orange</p>
            </div>
            <div class="season_card autumn">
                <img width="96" height="96" src="https://img.icons8.com/color/96/autumn.png" alt="autumn"/>
                <h2 class="cardo-regular">Autumn</h2>
                <p class="cardo-regular">The makeup tone is Orange-Red, Dark Peach, Red, Brown, Red Brick, Orange Brick, Warm Red, and Warm Orange</p>
            </div>
            <div class="season_card winter">
                <img width="96" height="96" src="https://img.icons8.com/color/96/winter--v1.png" alt="winter--v1"/>
                <h2 class="cardo-regular">Winter</h2>
                <p class="cardo-regular">The makeup tone is Berry, True Red, Burgundy, Plum, Dark Pink, and Fuchsia</p>
            </div>
        </div>
    </div>
</template>

<style>
.main {
    /* background-image: url(@/assets/pic.jpeg); */
    background: linear-gradient(180deg, white, rgba(237, 194, 216, 0.3), 
    rgba(237, 194, 216, 0.3), white); /* opacity = 0.3 */
    width: auto;
    height: 800px;
    /* object-fit: cover;
    object-position: center; */
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.home__content {
    display: flex;
    gap: 50px;
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
        grid-template-columns: repeat(2, 2fr);
    }

    .header_text {
        padding-block: 15%;
    }

    .home__content {
        margin-left: 15%;
        grid-column: 2/3;
    }

}

.title {
    text-align: center;
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
    width: 18%;
    padding: 4rem;
    margin: 4rem;
    text-align: center;
    float: left;
    border-radius: 20px;
}

.season_card img {
    margin-bottom: 1rem;
    justify-content: space-around;
}

.season_card h2 {
    font-size: 40px;
    font-weight: bold;
}

.season_card p {
    font-size: 24px;
}

.spring {
    border: 4px solid #FFC7EA;
}

.summer {
    border: 4px solid #CAEDFF;
}

.autumn {
    border: 4px solid #FBF0B2;
}

.winter {
    border: 4px solid #D8B4F8;
}

.header_img {
    width: auto;
    height: 750px;
}
</style>