<script setup>
import { ref } from 'vue'
import { RouterLink } from "vue-router";
</script>

<template>
    <nav class="nav container">
            <RouterLink to="/" class="nav__logo lora-font">FindColor</RouterLink>
            <div class="nav__list" id="nav-list">
                <ul>
                    <li class="nav__item">
                        <RouterLink to="/" class="nav__link josefin-sans-font">Home</RouterLink>
                    </li>
                    <li class="nav__item">
                        <RouterLink to="/product" class="nav__link josefin-sans-font">Product</RouterLink>
                    </li>
                    <li class="nav__item">
                        <RouterLink to="#" class="nav__link josefin-sans-font">Match Color</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="nav__menu">
                <div class="nav__close" id="nav-close">
                    <i class="fa-solid fa-xmark"></i>
                </div>

                <div class="nav__toggle" id="nav-toggle">
                    <i class="fa-solid fa-bars"></i>
                </div>
            </div>
    </nav>
</template>

<style>

ul {
    list-style-type: none;
}

a:link {
    text-decoration: none;
}

nav {
    padding: 30px 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: pink;
    position: relative;
    height: 70px;
}

.nav__logo {
    color: white;
    font-size: 32px;
}

nav ul {
    display: flex;
    gap: 80px;
}

nav ul li a {
    color: white;
    font-size: 22px;
}

.nav__menu {
    display: none;
}
</style>

