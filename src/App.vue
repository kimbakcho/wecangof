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
import MemberManagementUseCase from "@/Bis/MemberManagement/Domain/UseCase/MemberManagementUseCase";
import firebase from "firebase";
export default Vue.extend({
  name: 'App',

  data: () => ({
    transitionName: 'sliderOutRight',
    currentHistoryCount: 0,
    backActive: false,
    currentFromPath: "/",
    firebaseConfig : {
      apiKey: "AIzaSyCiC8m5pNQ9mG5t5iou8NSsk1k7JPk2k68",
      authDomain: "wecango.firebaseapp.com",
      projectId: "wecango",
      storageBucket: "wecango.appspot.com",
      messagingSenderId: "352727726767",
      appId: "1:352727726767:web:d0c40a11dc90a941c0f25a",
      measurementId: "G-9N5WDM9MY4"
    }
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
      if(to.path == "/linkBoard"){
        window.scrollTo(0,0)
        this.transitionName = 'slideUp'
        return;
      }
      if(from.path == "/linkBoard"){
        this.transitionName = 'slideDown'
        return;
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

    window.vmApp = this;

    firebase.initializeApp(this.firebaseConfig);

    const messaging = firebase.messaging()
    if(this.$store.state.isLogin){
      if(window.navigator.userAgent.indexOf("wecango") == -1){
        let token = await messaging.getToken({vapidKey: "BNi-JqLf5HCbYyGWXxy9-GSHrMru8rtdAdIODhAsYZQsSwH3__MImdnai1ZjXZH_fRt5wNh4KHQCl46OzqBauow"})
        let memberManagementUseCase = new MemberManagementUseCase();
        await memberManagementUseCase.updateFcmToken({
          uid: this.$store.state.userInfo.uid,
          token: token
        });
        messaging.onMessage(payload => {

          let dePay: any = JSON.parse(payload.data.payload);

          this.$swal.fire({
            title: dePay.title,
            text: dePay.message,
          });

        })
      }
    }
  }
});

</script>
<style scoped>
.loadingRoot{
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
</style>
<style>
body {
  overflow: hidden;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
}
.child-view {
  position: absolute;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: auto;
  overflow-x: hidden;
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

.sliderInRight-enter {
  transform: translate(100%, 0%);
}
.sliderInRight-enter-active {
  transition: all 1s;
}
.sliderInRight-enter-to{
  transform: translate(0%, 0%);
}

/*.sliderOutRight-leave-active {*/
/*  transform: translate(100%, 0%);*/
/*  transition: all 20s;*/
/*}*/


.slideUp-enter {
  transform: translate(0%, 100%);
}
.slideUp-enter-active {
  transition: all 1s;
}
.slideUp-enter-to{
  transform: translate(0%, 0%);
}

.slideUp-leave {
  transform: translate(0%, 0%);
}
.slideUp-leave-active {
  transition: all 1s;
}
.slideUp-leave-to {
  transform: translate(0%, 0%);
}

</style>

