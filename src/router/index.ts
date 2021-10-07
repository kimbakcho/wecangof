import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/UA001',
    name: 'UA001',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "UA001" */ '../views/UA/UA001.vue')
  },
  {
    path: '/BM003',
    name: 'BM003',
    component: () => import(/* webpackChunkName: "BM003" */ '../views/BM/BM003.vue')
  },
  {
    path: '/BM0031',
    name: 'BM0031',
    component: () => import(/* webpackChunkName: "BM003" */ '../views/BM/BM0031.vue'),
    props: true
  },
  {
    path: '/BM004/:nationId',
    name: 'BM004',
    component: () => import(/* webpackChunkName: "BM004" */ '../views/BM/BM004.vue'),
    props: true
  },
  {
    path: '/AM002',
    name: 'AM002',
    component: () => import(/* webpackChunkName: "BM004" */ '../views/AM/AM002.vue')
  },
  {
    path: '/naverRedirect',
    name: 'naverRedirect',
    component: () => import(/* webpackChunkName: "naverRedirect" */ '../views/NaverLoginRedirect.vue'),
  },
  {
    path: '/googleRedirect',
    name: 'googleRedirect',
    component: () => import(/* webpackChunkName: "googleRedirect" */ '../views/GoogleLoginRedirect.vue'),
  },
  {
    path: '/kakaoLoginRedirect',
    name: 'kakaoLoginRedirect',
    component: () => import(/* webpackChunkName: "kakaoLoginRedirect" */ '../views/KakaoLoginRedirect.vue'),
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
