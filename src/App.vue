<template>
  <v-app>
      <transition  :name="transitionName" appear>
        <router-view  class="child-view"/>

      </transition>
    <div class="loadingRoot" v-if="$root.$data.loading">
      <v-progress-circular
          :size="70"
          :width="7"
          color="#dbe5fd"
          indeterminate
      ></v-progress-circular>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from "axios";
import {MutationTypes} from "@/store/mutations";
import UserInfo from "@/Bis/Common/UserInfo";
import {QABoardFilterReqDto} from "@/Bis/QABoard/Dto/QABoardFilterReqDto";

export default Vue.extend({
  name: 'App',

  data: () => ({
    transitionName: 'sliderOutRight',
    currentHistoryCount: 0,
    backActive: false,
    currentFromPath: "/"
  }),
  watch: {
    '$route'(to, from) {
      const IsItABackButton  = window.popStateDetected;
      if(IsItABackButton){
        this.transitionName = 'sliderOutRight'
        this.backActive = IsItABackButton
        window.popStateDetected = false
        this.$forceUpdate()
        return ;
      }
      window.popStateDetected = false
      if(to.path.indexOf("/WCAdmin")>=0 || from.path.indexOf("/WCAdmin")>=0){
        return ;
      }
      if (to.path == "/UA001") {
        this.transitionName = 'sliderInRight'
        return;
      }
      if (to.path == "/BM003") {
        this.transitionName = 'sliderInRight'
        return;
      }
      if (to.path == "/AM002") {
        this.transitionName = 'sliderInRight'
        return;
      }
      if (to.path.indexOf("/BM004")>=0) {
        this.transitionName = 'sliderInRight'
        return;
      }
      if (to.path.indexOf("/BC001")>=0) {
        this.transitionName = 'sliderInRight'
        return;
      }
      if (to.path == "/") {
        this.transitionName = 'sliderOutRight'
        return;
      }
      if(to.path == "/linkBoard"){
        this.transitionName = 'slide-up'
        return;
      }
      if(from.path == "/linkBoard"){
        this.transitionName = 'slide-down'
        return;
      }

    }
  },
  async mounted() {
    this.$store.commit(MutationTypes.SET_QBOARD_FILTER,{
      pageReqDto: {
        page: 0,
        size: 5,
        sorts: [{
          column: "updateDateTime",
          direction: "Desc"
        }]
      }
    } as QABoardFilterReqDto)
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
        if(data){
          let userInfo = {};
          Object.assign(userInfo, data);
          this.$store.commit(MutationTypes.SET_ISLOGIN,true)
          this.$store.commit(MutationTypes.SET_ISUSERINFO,userInfo as UserInfo)
        }else {
          this.$store.commit(MutationTypes.SET_ISLOGIN, false)
        }
      }catch (e) {
        this.$store.commit(MutationTypes.SET_ISLOGIN,false)
      }
    }

  }

});

</script>
<style scoped>
.loadingRoot{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
</style>
<style>
.child-view {
  position: absolute;
  width: 100vw;
  height: 100vh;
}

.sliderInRight-enter {
  transform: translate(100%, 0%);
}
.sliderInRight-enter-active {
  transition: all 1s;
}
.sliderInRight-enter-to{
  transform: translate(0%, 0%);
}

.sliderInRight-leave {
  transform: translate(0%, 0%);
}
.sliderInRight-leave-active {
  transition: all 1s;
}
.sliderInRight-leave-to {
  transform: translate(0%, 0%);
}


.sliderOutRight-enter {
  transform: translate(0%, 0%);
}
.sliderOutRight-enter-active {
  transition: all 1s;
}
.sliderOutRight-enter-to {
  transform: translate(0%, 0%);
}

.sliderOutRight-leave {
  transform: translate(0%, 0%);
}
.sliderOutRight-leave-active {
  transition: all 1s;
}
.sliderOutRight-leave-to {
  transform: translate(100%, 0%);
}

/*.sliderOutRight-leave-active {*/
/*  transform: translate(100%, 0%);*/
/*  transition: all 20s;*/
/*}*/

.slide-up-enter, .slide-down-leave-active{
  transform: translate(0, 100%);
  transition: all 1s cubic-bezier(.55,0,.1,1);
}
</style>

