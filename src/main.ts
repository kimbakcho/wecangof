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
import VueGtag from "vue-gtag";
import {MutationTypes} from "@/store/mutations";
import UserInfo from "@/Bis/Common/UserInfo";
Vue.use(VueSweetalert2);

Vue.use(VueCookies);

Vue.use(VueViewer)

Vue.use(VueClipboard)
const axiosp: any = axios

Vue.use(axiosp)

const apiKey = process.env.VUE_APP_KAKAOAPIKEY

Vue.config.productionTip = false

Vue.use(VueGtag, {
    config: { id: "G-9N5WDM9MY4" }
},router);

//mobile 에서 100vh 대응
document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);

window.addEventListener('resize', () => {
    // We execute the same script as before
    if (window.navigator.userAgent.indexOf("wecango") == -1) {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
    }

});

const app = new Vue({
    data: { loading: false, pageLoadingCount: 0 },
    router,
    store,
    vuetify,
    render: h => h(App)
});

(async function start() {
    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const headers: any = axios.defaults.headers;
    const wSesstion = getCookie("wSesstion");
    if(wSesstion){
        headers['Authorization'] = 'Bearer ' + wSesstion
        try{
            const { data } = await axios.get("/MemberManagement/me");
            if(data){
                const userInfo = {};
                Object.assign(userInfo, data);
                app.$store.commit(MutationTypes.SET_ISLOGIN,true)
                app.$store.commit(MutationTypes.SET_ISUSERINFO,userInfo as UserInfo)
            }else {
                app.$store.commit(MutationTypes.SET_ISLOGIN, false)
            }
        }catch (e) {
            app.$store.commit(MutationTypes.SET_ISLOGIN,false)
        }finally {
            app.$mount('#app')
        }
    }else {
        app.$mount('#app')
    }
})();

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
    app.pageLoadingCount++;
})


Notification.requestPermission()
    .then((permission) => {
        console.log('permission ', permission)

        // if (permission !== 'granted') {
        //     alert('알림을 허용해주세요')
        // }
    })




