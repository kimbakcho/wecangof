<template>
  <div>
    <div class="top">
      <div @click="onUserClick">
        <v-icon color="#215DF1" size="18" class="userInfo">
          wc-userinfo
        </v-icon>
      </div>

      <img class="logo" src="@/assets/logo.png" >

      <div class="alarm" @click="alarmClick">
        <v-icon size="20" class="alarmIcon" color="#2661f1">
          wc-alarmbell
        </v-icon>
        <div class="alarmCount" v-if="unReadCount > 0">
          <span>
           {{unReadCountText()}}
          </span>
        </div>
      </div>
    </div>
    <div class="InOutDashContent">
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

      <UserBookMarkingList v-else :init-user-book-mark-list="userBookMarkList" @tapNation="bookMarkingSelect">

      </UserBookMarkingList>


      <div class="lastUpdate">
        {{ `최신 업데이트 ${lastCardUpdateTime}` }}
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

  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import TravelCard2 from "@/components/Common/TravelCard2.vue";
import NoneTravelCard from "@/components/Common/NoneTravelCard.vue";
import NoneBookMarking from "@/components/Common/NoneBookMarking.vue";
import UserBookMarkingList from "@/components/Common/UserBookMarkingList.vue";
import TravelCard3 from "@/components/Common/TravelCard3.vue";
import {UserBookMarkingCountryResDto} from "@/Bis/UserBookMarkingCountry/Dto/UserBookMarkingCountryResDto";
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";
import {DateTime} from "luxon";

export default Vue.extend({
  components: {
    TravelCard2, NoneTravelCard, NoneBookMarking, UserBookMarkingList, TravelCard3
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
    }
  },
  computed: {
    dragOptions() {
      return {
        delay: 1000,
        ghostClass: 'ghost'
      };
    },
  },
  data(){
    return {
      lastCardUpdateTime: ""
    }
  },
  mounted() {
    this.initSelectCard();
  },
  methods:{
    initSelectCard(){
      if(this.hasCurrentSelect()){
        if(this.userBookMarkList){
          let item = localStorage.getItem("currentSelectNationItem");
          if(item){
            let selectItem = JSON.parse(item) as UserBookMarkingCountryResDto;
            let findIndex = this.userBookMarkList.findIndex(x=>{
              return x.nationId.id == selectItem.nationId.id
            })
            if(findIndex < 0){
              localStorage.setItem("currentSelectNationItem","");
            }
          }else {
            localStorage.setItem("currentSelectNationItem","");
          }
        }else {
          localStorage.setItem("currentSelectNationItem","");
        }
      }
      this.$forceUpdate()
    },
    hasCurrentSelect() {
      let item = localStorage.getItem("currentSelectNationItem");
      if (item) {
        return true;
      } else {
        return false;
      }
    },
    userProfileImageUrl(){
      if(this.$store.state.isLogin){
        if(this.$store.state.userInfo.profileImage){
          return this.$store.state.userInfo.profileImage
        }
      }
      return require("@/assets/login_ico.png")
    },
    alarmClick(){
      if(this.$store.state.isLogin){
        this.$router.push({
          path: "/BM002",
        })
      }else {
        this.$swal("로그인이 필요합니다.")
      }
    },
    unReadCountText(){
      if(this.unReadCount == 0){
        return ""
      }
      if(this.unReadCount >= 10){
        return "9+"
      }
      return this.unReadCount;
    },
    getCurrentSelect() {
      let item = localStorage.getItem("currentSelectNationItem");
      if (item != null) {
        let selectItem = JSON.parse(item) as UserBookMarkingCountryResDto;
        let lastUpdate = DateTime.fromISO(selectItem.immigrationStatusSimpleResDto.updateDateTime);
        this.lastCardUpdateTime= lastUpdate.toFormat("yyyy-MM-dd");
        return selectItem;
      } else {
        return null;
      }
    },
    bookMarkingSelect(item: UserBookMarkingCountryResDto) {
      localStorage.setItem("currentSelectNationItem", JSON.stringify(item))
      let lastUpdate = DateTime.fromISO(item.immigrationStatusSimpleResDto.updateDateTime);
      this.lastCardUpdateTime= lastUpdate.toFormat("yyyy-MM-dd");
      this.$forceUpdate();
    },
    tapCard(item: ImmigrationStatusSimpleResDto) {
      this.$router.push({
        path: `/BM004/${item.nation.id}`,
      })
    },
    onUserClick() {
      this.$router.push({
        path: "/AM002"
      })
    },
  }
})
</script>
<style scoped>

.top {
  width: 100%;
  display: flex;
  padding-top: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  min-height: 70px;
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
  font-family: "Noto Sans KR";
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

.dragger {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.InOutDashContent{
  height: calc(100vh - 110px);
  overflow-y: auto;
}

.InOutDashContent::-webkit-scrollbar {
  display: none;
}

.userInfo{
  padding-left: 25px;
}

.logo{
  position: absolute;
  width: 50px;
  height: 50px;
  left: 25%;
  transform: translateX(-50%);

}
</style>
