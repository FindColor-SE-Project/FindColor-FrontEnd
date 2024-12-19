import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '@/views/Home.vue';
import BrandListView from '@/views/BrandListView.vue';
import SeasonSelectorPage from '@/views/SeasonSelector.vue';
import ProductListView from '@/views/Category/ProductListView.vue';
import ProductDetailView from '@/views/Category/ProductDetailView.vue';
// import SeasonLayout from '@/views/Season/SeasonLayout.vue';
// import SeasonLips from '@/views/Season/SeasonLips.vue';
// import SeasonBlush from '@/views/Season/SeasonBlush.vue';
// import SeasonEyeshadow from '@/views/Season/SeasonEyeshadow.vue';
import DatabaseError from '@/components/DatabaseError.vue';
import UploadView from '@/views/UploadView.vue';
import SeasonView from '@/views/Season/SeasonView.vue';

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
    path: '/seasonColorTone',
    name: 'seasonSelectorPage',
    component: SeasonSelectorPage,
  },
  {
    path: '/brands/:brandName',
    name: 'productListView',
    component: ProductListView,
    props: true
  }, 
  {
    path: '/brands/:brandName/:productName',
    name: 'productDetailView',
    component: ProductDetailView,
    props: true
  },
  // {
  //   path: '/seasonColorTone/:seasonColorTone',
  //   name: 'seasonLayout',
  //   component: SeasonLayout,
  //   props: true,
  //   children: [
  //     {
  //       path: '',
  //       redirect: { name: 'seasonLips' }
  //     },
  //     {
  //       path: 'lips',
  //       name: 'seasonLips',
  //       component: SeasonLips,
  //       props: true
  //     },
  //     {
  //       path: 'blush',
  //       name: 'seasonBlush',
  //       component: SeasonBlush,
  //       props: true
  //     },
  //     {
  //       path: 'eyeshadow',
  //       name: 'seasonEyeshadow',
  //       component: SeasonEyeshadow,
  //       props: true
  //     }
  //   ]
  // },
  {    
    path: '/seasonColorTone/:seasonColorTone',
    name: 'seasonView',
    component: SeasonView,
    props: true
  },
  {
    path: '/upload',
    name: 'uploadView',
    component: UploadView
  },
  {
      path: '/error',
      name: 'DatabaseError',
      component: DatabaseError
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active',
});

export default router;
