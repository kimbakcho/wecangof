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

import '@/assets/css/wcg.css'

import '@/assets/common.css'

import VueViewer from 'v-viewer'

import VueClipboard from 'vue-clipboard2'

import firebase from 'firebase/app'
import 'firebase/messaging'

Vue.use(VueSweetalert2);

Vue.use(VueCookies);

Vue.use(VueViewer)

Vue.use(VueClipboard)
const axiosp: any = axios

Vue.use(axiosp)


const apiKey = process.env.VUE_APP_KAKAOAPIKEY

Vue.config.productionTip = false

const app = new Vue({
    data: { loading: false },
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')

Vue.use(VueKakaoSdk, {apiKey})

window.popStateDetected = false
window.addEventListener('popstate', () => {
    window.popStateDetected = true
})

router.beforeEach((to, from, next) => {
    app.loading = true
    next()
})

router.afterEach(() => {
    app.loading = false
})

const firebaseConfig = {
    apiKey: "AIzaSyCiC8m5pNQ9mG5t5iou8NSsk1k7JPk2k68",
    authDomain: "wecango.firebaseapp.com",
    projectId: "wecango",
    storageBucket: "wecango.appspot.com",
    messagingSenderId: "352727726767",
    appId: "1:352727726767:web:d0c40a11dc90a941c0f25a",
    measurementId: "G-9N5WDM9MY4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

Notification.requestPermission()
    .then((permission) => {
        console.log('permission ', permission)
        if (permission !== 'granted') {
            alert('알림을 허용해주세요')
        }
    })





