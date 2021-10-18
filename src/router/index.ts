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
    path: "/QA006",
    name: "QA006",
    component: () => import(/* webpackChunkName: "QA006" */ '../views/QA/QA006.vue'),
    props: true
  },
  {
    path: "/QA003/:qaBoardId",
    name: "QA003",
    component: () => import(/* webpackChunkName: "QA003" */ '../views/QA/QA003.vue'),
    props: true
  },
  {
    path: '/AM002',
    name: 'AM002',
    component: () => import(/* webpackChunkName: "AM002" */ '../views/AM/AM002.vue')
  },
  {
    path: '/BM002',
    name: 'BM002',
    component: () => import(/* webpackChunkName: "BM002" */ '../views/BM/BM002.vue'),
    props: true
  },
  {
    path: '/AdminLogin',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "AdminLogin" */ '../views/AdminLogin.vue'),
    props:(route)=>({
      error: route.query.error
    })
  },
  {
    path: '/WCAdmin',
    name: 'WCAdmin',
    component: () => import(/* webpackChunkName: "WCAdmin" */ '../views/Admin/AdminMain.vue'),
    children:[
      {
        path:"CA001",
        name: "CA001",
        component: () => import(/* webpackChunkName: "CA001" */ '../views/CA/CA001.vue'),
      },
      {
        path: "CB002/:nationId",
        name: "CB002",
        component: () => import(/* webpackChunkName: "CB002" */ '../views/CB/CB002.vue'),
        props: true
      },
      {
        path: "CF001",
        name: "CF001",
        component: () => import(/* webpackChunkName: "CF001" */ '../views/CF/CF001.vue')
      }
    ],
    props: true
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
