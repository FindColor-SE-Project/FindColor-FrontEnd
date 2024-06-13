import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/views/Home.vue'
import BrandListView from '@/views/BrandListView.vue'
import GetSeasonsPage from '@/views/GetSeasons.vue'
import ProductListView from '@/views/ProductListView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Homepage
    },
    {
        path: '/brandListView',
        name: 'brandListView',
        component: BrandListView  
    },
    {
        path: '/getseasons',
        name: 'getseasonsPage',
        component: GetSeasonsPage  
    },
    {
        path: '/brandListView/:brandName',
        name: 'productListView',
        component: ProductListView,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
