<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list>
        <v-list-item to="/WCAdmin/CA001">
          국가 관리
        </v-list-item>
        <v-list-item to="/WCAdmin/CF001">
          알람
        </v-list-item>
        <v-list-item to="/WCAdmin/CC001">
          관리자 게시물
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>WeCanGo</v-toolbar-title>
      <v-spacer>

      </v-spacer>
      <Logout >

      </Logout>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue"
import Logout from "@/components/AM/Logout.vue";
import {Route} from "vue-router";
import axios from "axios";

export default Vue.extend({
  components:{
    Logout
  },
  data(){
    return {
      drawer: true
    }
  },

  async beforeRouteEnter(to: Route, from: Route, next: any) {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts: any = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    let headers: any = axios.defaults.headers;
    let wSesstion: string | null = getCookie("wSesstion");
    if(wSesstion){
      let sesstionSplit = wSesstion.split('.');
      let payload: any = JSON.parse(atob(sesstionSplit[1]));
      if(payload.role=="Admin") {
        next()
      }else {
        next({path: '/AdminLogin'})
      }
    }else {
      next({path: '/AdminLogin'})
    }

  }
})
</script>
<style scoped>
.logout{
  width: 150px;
  height: 50px;
  background: gray;
}
</style>
