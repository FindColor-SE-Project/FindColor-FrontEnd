import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../view/Home.vue'
import ProductPage from '../view/Product.vue'


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
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
}
)

export default router;