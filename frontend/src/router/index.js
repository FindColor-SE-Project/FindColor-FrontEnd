import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '@/views/Home.vue';
import BrandListView from '@/views/BrandListView.vue';
import GetSeasonsPage from '@/views/GetSeasons.vue';
import ProductListView from '@/views/Category/ProductListView.vue';
import LipsView from '@/views/Category/LipsView.vue';
import EyeshadowView from '@/views/Category/EyeshadowView.vue';
import BlushView from '@/views/Category/BlushView.vue';
import ProductLayout from '@/views/Category/ProductLayout.vue';
import ProductDetailView from '@/views/Category/ProductDetailView.vue';
import SeasonLayout from '@/views/Season/SeasonLayout.vue';
import SeasonLips from '@/views/Season/SeasonLips.vue';
import SeasonBlush from '@/views/Season/SeasonBlush.vue';
import SeasonEyeshadow from '@/views/Season/SeasonEyeshadow.vue';
import DatabaseError from '@/components/DatabaseError.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Homepage
  },
  {
    path: '/brands',
    name: 'brandListView',
    component: BrandListView  
  },
  {
    path: '/seasons',
    name: 'getseasonsPage',
    component: GetSeasonsPage,
  },
  {
    path: '/brands/:brandName',
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
        path: 'lips',
        name: 'lipsView',
        component: LipsView,
        props: true
      },
      {
        path: 'blush',
        name: 'blushView',
        component: BlushView,
        props: true
      },
      {
        path: 'eyeshadow',
        name: 'eyeshadowView',
        component: EyeshadowView,
        props: true
      }
    ]
  }, 
  {
    path: '/brands/:brandName/:productName',
    name: 'productDetailView',
    component: ProductDetailView,
    props: true
  },
  {
    path: '/seasons/:colorTone',
    name: 'seasonLayout',
    component: SeasonLayout,
    props: true,
    children: [
      {
        path: '',
        redirect: { name: 'seasonLips' }
      },
      {
        path: 'lips',
        name: 'seasonLips',
        component: SeasonLips,
        props: true
      },
      {
        path: 'blush',
        name: 'seasonBlush',
        component: SeasonBlush,
        props: true
      },
      {
        path: 'eyeshadow',
        name: 'seasonEyeshadow',
        component: SeasonEyeshadow,
        props: true
      }
    ]
  },
  {
      path: '/error',
      name: 'DatabaseError',
      component: DatabaseError
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
