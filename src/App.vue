<template>
  <v-app>
      <transition :name="transitionName">
        <router-view class="child-view"/>
      </transition>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Route} from "vue-router";
import axios from "axios";
import {MutationTypes} from "@/store/mutations";
import UserInfo from "@/Bis/Common/UserInfo";

export default Vue.extend({
  name: 'App',

  data: () => ({
    transitionName: 'sliderOutRight',
  }),
  watch: {
    '$route'(to, from) {
      if (to.path == "/UA001") {
        this.transitionName = 'sliderInRight'
      }
      if (to.path == "/BM003") {
        this.transitionName = 'sliderInRight'
      }
      if (to.path.indexOf("/BM004")>=0) {
        this.transitionName = 'sliderInRight'
      }
      if (to.path == "/") {
        this.transitionName = 'sliderOutRight'
      }
      if(to.path == "/linkBoard"){
        this.transitionName = 'slide-up'
      }
      if(from.path == "/linkBoard"){
        this.transitionName = 'slide-down'
      }
    }
  },
  async mounted() {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts: any = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    let headers: any = axios.defaults.headers;
    let wSesstion = getCookie("wSesstion");
    if(wSesstion){
      headers['Authorization'] = 'Bearer ' + wSesstion
      try{
        let { data } = await axios.get("/MemberManagement/me");
        let userInfo = {};
        Object.assign(userInfo, data);
        this.$store.commit(MutationTypes.SET_ISLOGIN,true)
        this.$store.commit(MutationTypes.SET_ISUSERINFO,userInfo as UserInfo)
      }catch (e) {
        this.$store.commit(MutationTypes.SET_ISLOGIN,false)
      }
    }



  }

});
</script>
<style>
.child-view {
  position: absolute;
  transition: all 1s;
  width: 100vw;
  height: 100vh;
}
.sliderInRight-enter {
  transform: translate(100%, 0%);
}

.sliderInRight-leave-active {
  transform: translate(0%, 0%);
  transition: all 1s;
}

.sliderOutRight-enter{
  transform: translate(0%, 0%);
}
.sliderOutRight-leave-active {
  transform: translate(100%, 0%);
  transition: all 1s;
}

.slide-up-enter, .slide-down-leave-active{
  transform: translate(0, 100%);
  transition: all 1s cubic-bezier(.55,0,.1,1);
}
</style>
