<template>
    <nav class="nav container">
            <router-link class="nav__logo lora-font" :to="{ name: 'home'}"><img class="logo" src="@/assets/logo.png"></router-link>
            <div class="nav__list" id="nav-list">
                <ul>
                    <li class="nav__item">
                        <router-link class="nav__link josefin-sans-font" :to="{ name: 'home'}">Home</router-link>
                    </li>
                    <li class="nav__item">
                        <router-link class="nav__link josefin-sans-font" :to="{ name: 'brandListView'}">Product</router-link>
                    </li>
                    <li class="nav__item">
                        <router-link class="nav__link josefin-sans-font" :to="{ name: 'uploadView'}" @click="changeNavigate">Get Seasons</router-link>
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

<script>
import axios from 'axios';

export default {
    methods: {
        async changeNavigate() {
            try{
                // ตรวจสอบข้อมูลผู้ใช้ที่มีค่า seasonColorTone ใน database
                const response = await axios.get('http://localhost:8000/user');
                
                if (response.data.length > 0) {
                    const seasonColorToneResponse = await axios.get('http://localhost:8000/user/seasonColorTone');
                    const seasonColorTone = seasonColorToneResponse.data.seasonColorTone;

                    // ถ้ามี SeasonColorTone และ รูปภาพ ไปหน้า SeasonLayout
                    if (seasonColorTone) {
                        this.$router.push({ name: 'seasonLayout', params: { seasonColorTone } });
                    } else {
                        // ถ้ามี รูปภาพ แต่ไม่มี seasonColorTone ไปหน้า uploadView
                        this.$router.push({ name: 'getseasonsPage' });
                    }
                } else {
                    // ถ้าไม่มีรูปใน Database ไปหน้า UploadView
                    this.$router.push({ name: 'uploadView' });
                }
            } catch (error) {
                this.$router.push({ name: 'DatabaseError' });
            }
        }
    }
}
</script>

<style>
.logo {
    width: 175px;
}

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
    border-radius: 5px;
}

nav ul li a.active {
    border: black solid 1px;
    background-color: #EDC2D8;
    padding: 7px;
    border-radius: 5px;
}

.circle {
  height: 30px;
  width: 30px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

</style>

