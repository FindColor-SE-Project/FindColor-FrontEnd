<script>
import { ref } from 'vue'

import BrandListView from '@/views/BrandListView.vue';
export default {
  components: {
    BrandListView
  }
}

</script>


<template>
  <div id="app">
    <nav class="nav container">
            <RouterLink to="/" class="nav__logo lora-font">FindColor</RouterLink>
            <div class="nav__list" id="nav-list">
                <ul>
                    <li class="nav__item">
                        <RouterLink to="/" class="nav__link josefin-sans-font">Home</RouterLink>
                    </li>
                    <li class="nav__item">
                        <RouterLink to="/brandListView" class="nav__link josefin-sans-font">Product</RouterLink>
                    </li>
                    <li class="nav__item">
                        <RouterLink to="/getseasons" class="nav__link josefin-sans-font">Get Seasons</RouterLink>
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
    <RouterView/>
    <!-- <Product /> -->
  </div>
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

/* nav ul li a:focus {
    border: black solid 1px;
    background-color: #EDC2D8;
    padding: 7px;
    border-radius: 20px;
} */
</style>


