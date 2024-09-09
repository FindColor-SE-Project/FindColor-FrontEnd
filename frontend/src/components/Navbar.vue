<script setup>
import { ref } from 'vue'
</script>

<template>
    <nav class="nav container">
            <router-link class="nav__logo lora-font" :to="{ name: 'home'}">FindColor</router-link>
            <div class="nav__list" id="nav-list">
                <ul>
                    <li class="nav__item">
                        <router-link class="nav__link josefin-sans-font" :to="{ name: 'home'}">Home</router-link>
                    </li>
                    <li class="nav__item">
                        <router-link class="nav__link josefin-sans-font" :to="{ name: 'brandListView'}">Product</router-link>
                    </li>
                    <li class="nav__item">
                        <router-link class="nav__link josefin-sans-font" :to="{ name: 'getseasonsPage'}">Get Seasons</router-link>
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

ul, .nav__logo {
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
    background-color: #FCF6F5;
    position: relative;
    height: 70px;
    border-bottom: black solid 2px;
}

.nav__logo {
    color: black;
    font-size: 32px;
}

nav ul {
    display: flex;
    gap: 80px;
}

nav ul li a {
    color: black;
    font-size: 22px;
}

.nav__menu {
    display: none;
}

nav ul li a:hover {
    border: black solid 1px;
    padding: 7px;
    border-radius: 20px;
}

nav ul li a.active {
    border: black solid 1px;
    background-color: #EDC2D8;
    padding: 7px;
    border-radius: 20px;
}
</style>

