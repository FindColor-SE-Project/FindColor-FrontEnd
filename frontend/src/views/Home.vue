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
                <p class="cardo-regular">The makeup tone is Coral, Orange, Milk Tea, Peach-Pink, Salmon-Pink, Salmon, Coral-Pink, and Peach</p>
            </div>
            <div class="season_card summer">
                <img width="96" height="96" src="https://img.icons8.com/color/96/summer--v1.png" alt="summer--v1"/>
                <h2 class="cardo-regular">Summer</h2>
                <p class="cardo-regular">The makeup tone is Pink Nude, Rosy, Pink, Lilac, Medium Pink, Light Rose, Light Pink, and Lavender</p>
            </div>
            <div class="season_card autumn">
                <img width="96" height="96" src="https://img.icons8.com/color/96/autumn.png" alt="autumn"/>
                <h2 class="cardo-regular">Autumn</h2>
                <p class="cardo-regular">The makeup tone is Orange-Red, Dark Peach, Red, Brown, Red Brick, Brick Orange, Tomato, and Brown Brick</p>
            </div>
            <div class="season_card winter">
                <img width="96" height="96" src="https://img.icons8.com/color/96/winter--v1.png" alt="winter--v1"/>
                <h2 class="cardo-regular">Winter</h2>
                <p class="cardo-regular">The makeup tone is Dark Pink, Burgundy, Berry, True Red, Deep Plum, Fuchsia, Magenta, and Hot Pink</p>
            </div>
        </div>
    </div>
</template>

<style>
.main {
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

.header_img {
    width: auto;
    height: 750px;
}

.home__content {
    display: flex;
    gap: 50px;
}

.home__content h2 {
    font-weight: 300;
    font-size: 72px;
}

.home__content h1 {
    font-size: 144px;
    font-weight: 100;
}

.home__content p {
    font-size: 30px;
}

@media (width > 768px) {
    .home__data {
        grid-template-columns: repeat(2, 2fr);
    }

    .header_text {
        padding-block: 14%;
    }

    .home__content {
        margin-left: 10%;
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
    padding: 5rem;
}

.season_card {
    width: auto;
    max-width: 600px;
    padding: 2rem;
    margin: 20px 50px;
    text-align: center;
    border-radius: 20px;
    transition: transform 0.3s;
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
    padding-top: 10px;
    font-size: 28px;
}

.season_card:hover {
    transform: scale(1.05); /* เพิ่มเอฟเฟกต์ hover */
}


.season_row {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* แบ่งเป็น 2 คอลัมน์ */
    gap: 2rem; /* ระยะห่างระหว่างคอลัมน์และแถว */
    justify-items: center;
    margin: 2rem;

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
</style>