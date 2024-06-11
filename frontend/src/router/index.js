import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/view/Home.vue'
import BrandListView from '@/view/BrandListView.vue'
import GetSeasonsPage from '@/view/GetSeasons.vue'
import ProductListView from '@/view/ProductListView.vue'

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
        component: ProductListView
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
}
)

export default router;