<template>
  <div class="mainRoot">
    <div class="top">
      <img src="@/assets/login_ico.png"
           class="login_ico" @click="onUserClick">
      <div class="logo">
        Logo
      </div>
      <div class="alarm">
        <v-icon size="20" class="alarmIcon" color="#2661f1">
          far fa-bell
        </v-icon>
        <div class="alarmCount">
          <span>
           1
          </span>

        </div>
      </div>
    </div>
    <div class="content">
      <div class="topDot dot">

      </div>
      <span class="interestTravel">
      내가 관심있는 여행지
    </span>
      <div class="travelCardPosition">
        <TravelCard2 v-if="hasCurrentSelect()"
                     :immigration-status-card-dto="getCurrentSelect().immigrationStatusSimpleResDto" @tapCard="tapCard">

        </TravelCard2>
        <NoneTravelCard v-else>

        </NoneTravelCard>
      </div>
      <NoneBookMarking v-if="userBookMarkList.length == 0">

      </NoneBookMarking>

      <UserBookMarkingList v-else :user-book-mark-list="userBookMarkList" @tapNation="bookMarkingSelect">

      </UserBookMarkingList>


      <!--      <draggable class="dragger" v-bind="dragOptions" v-model="myArray" group="people" @start="drag=true"-->
      <!--                 @end="drag=false">-->
      <!--        <div v-for="(item,index) in myArray" :key="index" class="countryButton">-->
      <!--          <div>-->
      <!--            {{ item.name }}-->
      <!--          </div>-->
      <!--        </div>-->

      <!--        &lt;!&ndash;        <CountryButton v-for="(item,index) in myArray" :key="index" class="countryButton">&ndash;&gt;-->
      <!--        &lt;!&ndash;          {{ i }}&ndash;&gt;-->
      <!--        &lt;!&ndash;        </CountryButton>&ndash;&gt;-->
      <!--      </draggable>-->


      <div class="lastUpdate">
        최신 업데이트 2021.08.15
      </div>
      <div class="divider">

      </div>
      <div class="secondaryDotList">
        <div class="dot">

        </div>
        <div class="dot">

        </div>
      </div>
      <div class="travelTitle2">
        한국인 인기 여행지! 이 나라는 어때?
      </div>
      <div class="adminTravelCardList">
        <TravelCard3 v-for="item in adminRecommendList" :key="item.id" class="travelItem"
                     :immigration-status-card-dto="item" @tapCard="tapCard">

        </TravelCard3>
      </div>
    </div>
    <div class="bottom">
      <div class="bottomNav">
        <div class="inout" :class="{ active: inoutMode }" @click="inModeClick">
          <v-icon>
            fas fa-paper-plane
          </v-icon>
          <div class="menuText">
            IN & OUT
          </div>
        </div>
        <div class="plusBtn" @click="plusClick">
          <div class="inPlusBtn">
            <v-icon color="white" size="30">
              fas fa-plus
            </v-icon>
          </div>
        </div>
        <div class="qAnda" :class="{ active: qAndAMode }">
          <v-icon @click="qAndAModeClick">
            far fa-comments
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
import TravelCard2 from "@/components/Common/TravelCard2.vue";
import {Route} from "vue-router";
import axios from "axios";
import {MutationTypes} from "@/store/mutations";
import UserInfo from "@/Bis/Common/UserInfo";
import NoneTravelCard from "@/components/Common/NoneTravelCard.vue";
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";
import {UserBookMarkingCountryResDto} from "@/Bis/UserBookMarkingCountry/Dto/UserBookMarkingCountryResDto";
import NoneBookMarking from "@/components/Common/NoneBookMarking.vue";
import UserBookMarkingList from "@/components/Common/UserBookMarkingList.vue";
import ImmigrationStatusUseCase from "@/Bis/ImmigrationStatus/Domain/UseCase/ImmigrationStatusUseCase";
import TravelCard3 from "@/components/Common/TravelCard3.vue";

export default Vue.extend({
  name: 'Home',

  components: {
    TravelCard2, NoneTravelCard, NoneBookMarking, UserBookMarkingList, TravelCard3
  },
  computed: {
    dragOptions() {
      return {
        delay: 1000,
        ghostClass: 'ghost'
      };
    },
  },
  props: {
    userBookMarkList: {
      type: Array as PropType<UserBookMarkingCountryResDto[]>,
    },
    adminRecommendList: {
      type: Array as PropType<ImmigrationStatusSimpleResDto[]>,
    }
  },

  methods: {
    hasCurrentSelect() {
      let item = localStorage.getItem("currentSelectNationItem");
      if (item) {
        return true;
      } else {
        return false;
      }
    },
    getCurrentSelect() {
      let item = localStorage.getItem("currentSelectNationItem");
      if (item != null) {
        return JSON.parse(item) as UserBookMarkingCountryResDto
      } else {
        return null;
      }
    },
    onUserClick() {
      this.$router.push({
        path: "/UA001"
      })
    },
    plusClick() {
      this.$router.push({
        path: "/BM003"
      })
    },
    bookMarkingSelect(item: UserBookMarkingCountryResDto) {
      localStorage.setItem("currentSelectNationItem", JSON.stringify(item))
      this.$forceUpdate();
    },
    inModeClick() {
      this.inoutMode = true;
      this.qAndAMode = false;
    },
    qAndAModeClick() {
      this.$swal("준비중")
      // return ;
      // this.inoutMode = false;
      // this.qAndAMode = true;
    },
    tapCard(item: ImmigrationStatusSimpleResDto) {
      this.$router.push({
        path: `/BM004/${item.nation.id}`,

      })
    }
  },
  data() {
    return {
      inoutMode: true,
      qAndAMode: false
    }
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

    params.userBookMarkList = [];
    if (wSesstion) {
      const {data} = await axios.get<UserBookMarkingCountryResDto[]>("/UserBookMarkingCountry/BookMarkings");

      params.userBookMarkList = data;
    }

    next(async (vm: Vue) => {
      try {
        let {data} = await axios.get("/MemberManagement/me");
        let userInfo = {};
        Object.assign(userInfo, data);
        vm.$store.commit(MutationTypes.SET_ISLOGIN, true)
        vm.$store.commit(MutationTypes.SET_ISUSERINFO, userInfo as UserInfo)
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
  height: calc(100vh);
  overflow: hidden;
}

.content {
  height: calc(100vh - 75px);
  overflow-y: auto;
}

.content::-webkit-scrollbar {
  display: none;
}

.top {
  width: 100%;
  display: flex;
  padding-top: 30px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

.top .login_ico {
  width: 18px;
  height: 18px;
  margin-left: 26px;
  object-fit: contain;
}

.alarm {
  margin-right: 32px;
  position: relative;
}

.alarmCount {
  position: absolute;
  bottom: 0;
  left: 80%;
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

.topDot {
  margin: 30px 103px 10px 25px;
}

.dot {
  width: 10px;
  height: 10px;
  border: solid 1px #242424;
  border-radius: 50%;
}

.interestTravel {
  width: 175px;
  height: 29px;
  margin: 10px 16px 20px 25px;
  font-family: NotoSansKR;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #242424;
}

.travelCardPosition {
  margin: 20px 25px 25px;
}

.bookMarkList {
  display: flex;
  overflow-x: auto;
  padding-left: 25px;
}

/*.bookMarkList .countryButton {*/
/*  margin-right: 31px;*/
/*}*/
.countryButton {
  min-width: 120px;
}

.lastUpdate {
  margin: 15px 25px 30px 16px;
  font-family: NotoSansKR;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #a7aab2;
}

.divider {
  width: 100%;
  height: 1px;
  margin: 30px 0;
  background-color: #e9ebf4;
}

.secondaryDotList {
  display: flex;
  padding-left: 25px;
}

.secondaryDotList .dot {
  margin-right: 5px;
}

.travelTitle2 {
  padding-left: 25px;
  height: 29px;
  margin: 10px 0 0;
  font-family: NotoSansKR;
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

.dragger {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
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
  font-family: NotoSansKR;
  font-size: 8px;
}
</style>
