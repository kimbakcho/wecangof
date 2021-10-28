<template>
  <div>
    <div class="bookMarkBtn" :class="{active: hasBookMark}" @click="bookMarkClick">
      <v-icon v-if="hasBookMark" color="#545454" size="16">
        wc-bookmarkingafter
      </v-icon>
      <v-icon v-else color="white" size="16">
        wc-bookmarkingbefore
      </v-icon>
      {{ getMessage() }}
    </div>
    <v-dialog v-model="dialog" max-width="80%">
      <div class="cardBg">
        <div class="dTitle">
          내 여행지에 저장
        </div>
        <div class="alarmContent">
          메인 페이지에서 실시간 소식을 확인할 수 있어요.
        </div>
        <div class="actionBar">
          <div @click="gotoMainPage">
            바로 확인하기
          </div>
          <div @click="dialog=false">
            닫기
          </div>
        </div>

      </div>
    </v-dialog>


  </div>
</template>
<script lang="ts">
import Vue from "vue"
import UserBookMarkingCountryUseCase from "@/Bis/UserBookMarkingCountry/Domain/UseCase/UserBookMarkingCountryUseCase";
import NationChangeAlarmUseCase from "@/Bis/NationChangeAlarm/Domain/NationChangeAlarmUseCase";
import {UserBookMarkingCountryResDto} from "@/Bis/UserBookMarkingCountry/Dto/UserBookMarkingCountryResDto";

export default Vue.extend({

  props:{
    nationId: {
      type: Number,
      required: true
    },
    hasBookMark: {
      type: Boolean,
      required: false
    }
  },
  data(){
    return {
      dialog: false,
      alarmDialog: false,
      currentBookMarking: {} as UserBookMarkingCountryResDto
    }
  },
  methods:{
    getMessage(){
      if(this.hasBookMark) {
        return "관심 여행지로 추가됨"
      }else {
        return "관심 여행지 추가하기"
      }
    },
    async bookMarkClick(){
      if(!this.$store.state.isLogin) {
        await this.$swal("로그인이 필요 합니다.");
        await this.$router.push({
          path:"/UA001"
        })
        return ;
      }
      if(!this.hasBookMark){
        this.dialog = true
      }
      let userBookMarkingCountryUseCase = new UserBookMarkingCountryUseCase();
      this.$emit("update:hasBookMark",!this.hasBookMark)
      if(!this.hasBookMark){
        this.currentBookMarking = await userBookMarkingCountryUseCase.bookMarking(this.nationId);
      }else {
        await userBookMarkingCountryUseCase.bookUnMarking(this.nationId);
      }
    },

    gotoMainPage() {
      localStorage.setItem("currentSelectNationItem", JSON.stringify(this.currentBookMarking))
      this.$router.push({
        path:"/"
      })
    },
  }


})
</script>
<style scoped>
.bookMarkBtn{

  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR";
  font-size: 14px;
  color: #fff;
  background-color: #215df1;
  border-radius: 5px;
}

.bookMarkBtn.active {
  color: #545454;
  background-color: white;
  border: unset;

  border: solid 1px #e6e6e6;
}
.cardBg{
  height: 250px;
  border-radius: 10px;
  background-color: #fff;
  padding: 25px;
}

.cardBg .dTitle{
  height: 26px;
  font-family: "Noto Sans KR";
  font-size: 19px;
  font-weight: bold;
  color: #242424;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 35px;
}
.dTitle1{
  font-family: "Noto Sans KR";
  font-size: 17px;
  font-weight: bold;
}
.alarmContent{
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR";
  font-size: 13px;
  padding-top: 30px;
}
.actionBar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0px;
}
.actionBar div:nth-child(1){
  flex: 1;
  border-radius: 38px;
  border: solid 1px #242424;
  background-color: #fff;
  height: 47px;
  color: #242424;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-size: 12px;
  margin-right: 15px;
}

.actionBar div:nth-child(2){
  flex: 1;
  border-radius: 38px;
  background-color: #242424;
  height: 47px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-size: 12px;
}

</style>
<style>
.swal2-title{
  font-size: 1.2em;
}
</style>
