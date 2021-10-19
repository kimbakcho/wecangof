<template>
  <div>
    <div class="bookMarkBtn" :class="{active: hasBookMark}" @click="bookMarkClick">
      {{ getMessage() }}
    </div>
    <v-dialog v-model="dialog" max-width="80%">
      <div class="cardBg">
        <div class="dTitle">
          내 여행지에 저장되었습니다
        </div>
        <div class="alarmContent">
          업데이트 소식을 받아보실 수 있어요
        </div>
        <div class="actionBar">
          <div @click="alarmReceiveClick">
            소식 받아보기
          </div>
          <div @click="dialog=false">
            닫기
          </div>
        </div>

      </div>
    </v-dialog>

    <v-dialog v-model="alarmDialog" max-width="80%">
      <div class="cardBg">
        <div class="dTitle1">
          여행 가능 알림이 신청 되었어요
        </div>
        <div class="alarmContent">
          업데이트 소식을 받아보실 수 있어요
        </div>
        <div class="alarmActionBar">
          <div class="alarmConfirm" @click="alarmDialogConfirm">
            확인
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
    }
  },
  methods:{
    getMessage(){
      if(this.hasBookMark) {
        return "내 여행지 목록에 추가한 나라"
      }else {
        return "내 여행지 목록에 추가하기 +"
      }
    },
    async bookMarkClick(){
      if(!this.$store.state.isLogin) {
        this.$swal("로그인이 필요 합니다.").then((x)=>{
          this.$router.push({
            path:"/UA001"
          })
        })
        return ;
      }
      if(!this.hasBookMark){
        this.dialog = true
      }
      let userBookMarkingCountryUseCase = new UserBookMarkingCountryUseCase();
      this.$emit("update:hasBookMark",!this.hasBookMark)
      if(!this.hasBookMark){
        await userBookMarkingCountryUseCase.bookMarking(this.nationId);
      }else {
        await userBookMarkingCountryUseCase.bookUnMarking(this.nationId);
      }
    },

    alarmReceiveClick() {
      let nationChangeAlarmUseCase = new NationChangeAlarmUseCase();
      nationChangeAlarmUseCase.save(this.nationId);
      this.alarmDialog = true;
    },

    alarmDialogConfirm(){
      this.dialog = false;
      this.alarmDialog = false;
    }
  }


})
</script>
<style scoped>
.bookMarkBtn{
  border-radius: 5px;
  border: solid 1px #e6e6e6;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR";
  font-size: 14px;
  color: #545454;
}

.bookMarkBtn.active {
  background-color: #215df1;
  color: #fff;
  border: unset;
}
.cardBg{
  height: 217px;
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

.alarmActionBar{
  width: 100%;

}
.alarmConfirm{
  margin-top: 31px;
  width: 100%;
  height: 47px;
  border-radius: 23.5px;
  background: #242424;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>
<style>
.swal2-title{
  font-size: 1.2em;
}
</style>
