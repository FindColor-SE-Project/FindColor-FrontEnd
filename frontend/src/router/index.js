import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/views/Home.vue'
import BrandListView from '@/views/BrandListView.vue'
import GetSeasonsPage from '@/views/GetSeasons.vue'
import ProductListView from '@/views/Category/ProductListView.vue'
import LipsView from '@/views/Category/LipsView.vue'
import EyeshadowView from '@/views/Category/EyeshadowView.vue'
import BlushView from '@/views/Category/BlushView.vue'
import ProductLayout from '@/views/Category/ProductLayout.vue'
import ProductDetailView from '@/views/Category/ProductDetailView.vue'
import SeasonProductView from '@/views/Season/SeasonProductView.vue'

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
        component: GetSeasonsPage,
    },
    {
        path: '/brandListView/:brandName',
        name: 'productLayout',
        component: ProductLayout,
        props: true,
        children: [
            {
                path: '',
                name: 'productListView',
                component: ProductListView,
                props: true,
            },
            {
                path: 'Lips',
                name: 'lipsView',
                component: LipsView,
                props: true
            },            {
                path: 'Blush',
                name: 'blushView',
                component: BlushView,
                props: true
            },            {
                path: 'Eyeshadow',
                name: 'eyeshadowView',
                component: EyeshadowView,
                props: true
            }, 
        ]
    }, 
    {
        path: '/brandListView/:brandName/:productName',
        name: 'productDetailView',
        component: ProductDetailView,
        props: true
    },
    {
        path: '/getseasons/:colorTone',
        name: 'seasonProductView',
        component: SeasonProductView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
