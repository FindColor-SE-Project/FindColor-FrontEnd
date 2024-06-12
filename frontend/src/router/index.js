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
        props: true,
        beforeEnter: (to, from, next) => {
            const brandName = to.params.brandName;
            if (brandName && typeof brandName === 'string' && brandName.trim() !== '') {
                next();
            } else {
                next({ name: 'brandListView' }); // Redirect to brand list if brandName is not valid
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
