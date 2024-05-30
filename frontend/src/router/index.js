import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../view/Home.vue'
import ProductPage from '../view/Product.vue'
import GetSeasonsPage from '../view/GetSeasons.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Homepage
    },
    {
        path: '/product',
        name: 'productPage',
        component: ProductPage  
    },
    {
        path: '/getseasons',
        name: 'getseasonsPage',
        component: GetSeasonsPage  
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
}
)

export default router;