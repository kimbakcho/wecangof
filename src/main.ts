import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from '@/plugins/axiosp';

import VueKakaoSdk from 'vue-kakao-sdk'

import VueCookies from "vue-cookies";

import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.use(VueCookies);

const axiosp: any = axios

Vue.use(axiosp)


const apiKey = process.env.VUE_APP_KAKAOAPIKEY

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueKakaoSdk, { apiKey })
