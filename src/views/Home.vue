<template>
  <div class="mainRoot">
    <div class="content">
      <div class="top">
        <div @click="onUserClick">
          <v-icon color="#215DF1" size="18" class="userInfo">
            wc-userinfo
          </v-icon>
        </div>

        <img class="logo" src="@/assets/logo.png">

        <div class="alarm" @click="alarmClick">
          <v-icon size="20" class="alarmIcon" color="#2661f1">
            wc-alarmbell
          </v-icon>
          <div class="alarmCount" v-if="unReadCount > 0">
          <span>
           {{ unReadCountText() }}
          </span>
          </div>
        </div>
      </div>
      <div class="InOutDashContent">

        <div class="divider">

        </div>
        <div class="travelTitle2">
          한국인 인기 여행지! 이 나라는 어때?
        </div>
        <div class="adminTravelCardList" >
          <TravelCard3 v-for="item in adminRecommendList" :key="item.id" class="travelItem"
                       :immigration-status-card-dto="item" @tapCard="tapCard">

          </TravelCard3>
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
import ImmigrationStatusUseCase from "@/Bis/ImmigrationStatus/Domain/UseCase/ImmigrationStatusUseCase";
import UserAlarmUseCase from "@/Bis/UserAlarm/Domain/UseCase/UserAlarmUseCase";
import TravelCard3 from "@/components/Common/TravelCard3.vue";


export default Vue.extend({
  name: 'Home',
  components: {
    TravelCard3
  },
  props: {
    adminRecommendList: {
      type: Array as PropType<ImmigrationStatusSimpleResDto[]>,
    },
    unReadCount: {
      type: Number,
    },
  },
  methods: {
    async alarmClick() {
      if (this.$store.state.isLogin) {
        await this.$router.push({
          path: "/BM002",
        })
      } else {
        await this.$swal("로그인이 필요합니다.")
        await this.$router.push({
          path: "/UA001",
        })
      }
    },
    tapCard(item: ImmigrationStatusSimpleResDto) {
      this.$router.push({
        path: `/BM004/${item.nation.id}`,
      })
    },
    unReadCountText() {
      if (this.unReadCount == 0) {
        return ""
      }
      if (this.unReadCount >= 10) {
        return "9+"
      }
      return this.unReadCount;
    },
    onUserClick() {
      this.$router.push({
        path: "/AM002"
      })
    },
  },

  async mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  async beforeRouteEnter(to: Route, from: Route, next: any) {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts: any = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    let headers: any = axios.defaults.headers;
    let wSesstion = getCookie("wSesstion");
    if (wSesstion) {
      headers['Authorization'] = 'Bearer ' + wSesstion
    }
    let immigrationStatusUseCase = new ImmigrationStatusUseCase();
    let params: any = to.params;

    let immigrationStatusSimpleResDtos = await immigrationStatusUseCase.getAdminMainRecommend();
    params.adminRecommendList = []
    if (immigrationStatusSimpleResDtos) {
      params.adminRecommendList = immigrationStatusSimpleResDtos;
    }

    if (wSesstion) {
      try {
        let userAlarmUseCase = new UserAlarmUseCase();
        params.unReadCount = await userAlarmUseCase.unReadCount();
      } catch (ex) {
        console.log(ex);
      }
    }

    next(async (vm: Vue) => {
      try {
        let {data} = await axios.get("/MemberManagement/me");
        if (data) {
          let userInfo = {};
          Object.assign(userInfo, data);
          vm.$store.commit(MutationTypes.SET_ISLOGIN, true)
          vm.$store.commit(MutationTypes.SET_ISUSERINFO, userInfo as UserInfo)
          if (window.navigator.userAgent.indexOf("wecango") > 0) {
            try {
              window.wecango.postMessage(JSON.stringify(userInfo))
            } catch (e) {
              console.log("wecangochannel")
              console.log(e)
            }
          }
        } else {
          vm.$store.commit(MutationTypes.SET_ISLOGIN, false)
        }
      } catch (e) {
        vm.$store.commit(MutationTypes.SET_ISLOGIN, false)
      } finally {
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

.top {
  width: 100%;
  display: flex;
  padding-top: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  min-height: 70px;
}
.content {
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: hidden;

  width: 100vw;
}
.top .login_ico {
  width: 18px;
  height: 18px;
  margin-left: 26px;
  object-fit: contain;
}

.alarm {
  margin-right: 25px;
  position: relative;
}

.alarmCount {
  position: absolute;
  bottom: 0;
  left: 60%;
  width: 12px;
  height: 12px;
  background-color: #f5b400;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alarmCount span {
  font-family: NotoSansCJKKR;
  font-size: 8px;
  font-weight: 500;
  line-height: 8px;

  color: #fff;
}
.divider {
  width: 100%;
  height: 1px;
  margin: 30px 0;
  background-color: #e9ebf4;
}
.travelTitle2 {
  padding-left: 25px;
  height: 29px;
  margin: 10px 0 0;
  font-family: "Noto Sans KR";
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #242424;
}

.adminTravelCardList {
  padding: 20px;
}

.adminTravelCardList .travelItem {
  margin-bottom: 20px;
}

.userInfo{
  padding-left: 25px;
}

.logo{
  position: absolute;
  width: 50px;
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
}
.InOutDashContent{
  height: calc(calc(var(--vh, 1vh) * 100) - 50px);
  overflow-y: auto;
}

.InOutDashContent::-webkit-scrollbar {
  display: none;
}


</style>

