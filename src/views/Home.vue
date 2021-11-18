<template>
  <div class="mainRoot">
    <div class="content" :class="{inOutDash: inoutMode, qAndAMode: qAndAMode }">
        <InOutDash class="contentItem" :user-book-mark-list="userBookMarkList" :admin-recommend-list="adminRecommendList"
                   :un-read-count="unReadCount" :alarm-docs="alarmDocs">

        </InOutDash>

        <CommunityHome class="contentItem" >

        </CommunityHome>
    </div>
    <div class="bottom">
      <div class="bottomNav">
        <div class="inout" :class="{ active: inoutMode }" @click="inModeClick">
          <v-icon>
            wc-inandout
          </v-icon>
          <div class="menuText">
            IN & OUT
          </div>
        </div>
        <div class="plusBtn" @click="plusClick">
          <div class="inPlusBtn">
            <v-icon v-if="inoutMode" color="white" size="30">
              wc-plus
            </v-icon>
            <v-icon v-if="qAndAMode" color="white" size="30">
              wc-writepen
            </v-icon>
          </div>
        </div>

        <div class="qAnda" :class="{ active: qAndAMode }" @click="qAndAModeClick">
          <v-icon >
            wc-commnuity
          </v-icon>
          <div class="menuText">
            Q & A
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Route} from "vue-router";
import axios from "axios";
import {MutationTypes} from "@/store/mutations";
import UserInfo from "@/Bis/Common/UserInfo";

import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";
import {UserBookMarkingCountryResDto} from "@/Bis/UserBookMarkingCountry/Dto/UserBookMarkingCountryResDto";

import ImmigrationStatusUseCase from "@/Bis/ImmigrationStatus/Domain/UseCase/ImmigrationStatusUseCase";

import UserAlarmUseCase from "@/Bis/UserAlarm/Domain/UseCase/UserAlarmUseCase";
import InOutDash from "@/components/Home/InOutDash.vue";
import CommunityHome from "@/components/Home/CommunityHome.vue";
import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";
import {QABoardCategoryUseCase} from "@/Bis/QABoardCategory/Domain/QABoardCategoryUseCase";
import AdminContentUseCase from "@/Bis/AdminContent/Domain/UseCase/AdminContentUseCase";
import {AdminContentSimpleResDto} from "@/Bis/AdminContent/Dto/AdminContentSimpleResDto";
import firebase from 'firebase/app'
import MemberManagementUseCase from "@/Bis/MemberManagement/Domain/UseCase/MemberManagementUseCase";

export default Vue.extend({
  name: 'Home',
  components:{
    InOutDash, CommunityHome
  },
  props: {
    userBookMarkList: {
      type: Array as PropType<UserBookMarkingCountryResDto[]>,
    },
    adminRecommendList: {
      type: Array as PropType<ImmigrationStatusSimpleResDto[]>,
    },
    unReadCount: {
      type: Number,
    },
    qaBoardCategorys: {
      type: Array as PropType<QABoardCategoryResDto[]>,
    },
    alarmDocs: {
      type: Array as PropType<AdminContentSimpleResDto[]>,
    }
  },
  computed:{
    inoutMode(): boolean{
      return this.$store.state.inoutMode
    },
    qAndAMode(): boolean{
      return this.$store.state.qAndAMode
    }
  },
  provide () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this: any = this;
    return {
      qaBoardCategorys: _this.qaBoardCategorys
    }
  },
  async mounted() {
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
    document.dispatchEvent(new Event('render-event'))
  },
  methods: {
    plusClick() {
      if(this.inoutMode){
        this.$router.push({
          path: "/BM003"
        })
      } else if(this.qAndAMode) {
        if(this.$store.state.isLogin){
          this.$router.push({
            path: "/QA006"
          })
        }else {
          this.$swal("로그인이 필요합니다.")
        }
      }
    },
    inModeClick() {
      this.$store.commit(MutationTypes.SET_INOUTMODE)
    },
    qAndAModeClick() {
      // if(process.env.NODE_ENV == "production"){
      //   this.$swal("준비중")
      //   return ;
      // }
      this.$store.commit(MutationTypes.SET_QANDAMODE)
    },
  },
  async beforeRouteEnter(to: Route, from: Route, next: any) {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts: any = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    let headers: any = axios.defaults.headers;
    let wSesstion = getCookie("wSesstion");
    if(wSesstion){
      headers['Authorization'] = 'Bearer ' + wSesstion
    }
    let immigrationStatusUseCase = new ImmigrationStatusUseCase();
    let params: any = to.params;

    let immigrationStatusSimpleResDtos = await immigrationStatusUseCase.getAdminMainRecommend();
    params.adminRecommendList = []
    if(immigrationStatusSimpleResDtos){
      params.adminRecommendList = immigrationStatusSimpleResDtos;
    }

    let qaBoardCategoryUseCase = new QABoardCategoryUseCase();

    let qaBoardCategorysItems = await qaBoardCategoryUseCase.getList();
    qaBoardCategorysItems.map(x=>{
      x.active = false
    })

    let totalCate = {
      categoryName: "전체",
      orderIdx: 0,
      active: true
    } as QABoardCategoryResDto;

    params.qaBoardCategorys = [totalCate ,...qaBoardCategorysItems]

    params.userBookMarkList = [];

    let adminContentUseCase = new AdminContentUseCase();

    params.alarmDocs = await adminContentUseCase.getMainPageDocs();

    if (wSesstion) {
      try{
        const {data} = await axios.get<UserBookMarkingCountryResDto[]>("/UserBookMarkingCountry/BookMarkings");
        params.userBookMarkList = data;
        let userAlarmUseCase = new UserAlarmUseCase();
        params.unReadCount = await userAlarmUseCase.unReadCount();

      }catch (ex) {
        console.log(ex);
      }
    }

    next(async (vm: Vue) => {
      try {
        let {data} = await axios.get("/MemberManagement/me");
        if(data){
          let userInfo = {};
          Object.assign(userInfo, data);

          vm.$store.commit(MutationTypes.SET_ISLOGIN, true)
          vm.$store.commit(MutationTypes.SET_ISUSERINFO, userInfo as UserInfo)
          if(window.navigator.userAgent.indexOf("wecango") > 0){
            let win: any = window
            try{
              win.wecango.postMessage(JSON.stringify(userInfo))
            }catch (e) {
              console.log("wecangochannel")
              console.log(e)
            }
          }
        }else {
          vm.$store.commit(MutationTypes.SET_ISLOGIN, false)
        }
      } catch (e) {
        vm.$store.commit(MutationTypes.SET_ISLOGIN, false)
      }finally {
        next()
      }
    });
  }
})
</script>
<style scoped>
.mainRoot {
  height: calc(var(--vh, 1vh) * 100);
}

.content {
  height: calc(calc(var(--vh, 1vh) * 100) - 35px);
  overflow-y: hidden;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  width: 200vw;
}


.notice {
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: 119px;
  padding: 30px 0 30px 25px;
  background-color: #f5f7f8;
}

.bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

.bottomNav {
  position: relative;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}

.bottomNav .plusBtn {
  height: 60px;
  width: 60px;
  text-align: center;
  position: absolute;
  background-color: #2661f150;
  bottom: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.inPlusBtn {
  height: 50px;
  width: 50px;
  background-color: #2661f1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.inout {
  width: 93px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inout.active .v-icon {
  color: #205bf0;
}

.qAnda {
  width: 93px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qAnda.active .v-icon {
  color: #205bf0;
}

.menuText {
  margin-top: 5px;
  font-family: "Noto Sans KR";
  font-size: 8px;
}
.contentItem{
  width: 100vw;
  overflow-x: hidden;
}

.content.inOutDash{
  transform: translateX(0vw);
  transition: transform 1s;
}
.content.qAndAMode{
  transform: translateX(-100vw);
  transition: transform 1s;
}
.contentItem::-webkit-scrollbar {
  display: none;
}
</style>

