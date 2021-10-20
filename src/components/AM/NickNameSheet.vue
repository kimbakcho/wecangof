<template>
  <v-bottom-sheet v-model=dialog width="90%">
    <div class="NickNameDialogRoot">
      <div class="dialogTitle">
        별명 수정
      </div>
      <div class="dialogSubTitle">
        별명
      </div>
      <div class="inputNickName">
        <v-text-field placeholder="별명을 입력해주세요(10자미만)"
                      hide-details dense
                      v-model="nickName" filled outlined background-color="#e9ebf4">
        </v-text-field>
      </div>
      <div class="warningText">
        *별명에 특수기호를 사용할 수 없습니다.
      </div>
      <div class="actions">
        <button class="cancelBtn" @click="closeDialog">
          취소
        </button>
        <button class="setBtn" @click="setNickName">
          확인
        </button>

      </div>
    </div>
  </v-bottom-sheet>
</template>
<script lang="ts">
import Vue from "vue"
import NationControlUseCase from "@/Bis/NationControl/Domain/UseCase/NationControlUseCase";

const NickNameSheet = Vue.extend({
  data(){
    return {
      dialog: false,
      nickName: ""
    }
  },
  methods:{
    open(){
      this.nickName=""
      this.dialog = true
    },
    closeDialog(){
      this.dialog = false
    },
    async setNickName(){
      let nationControlUseCase = new NationControlUseCase();
      let check = await nationControlUseCase.checkNickName(this.nickName);
      if(check) {
        this.$swal("현재 다른 사람이 사용중인 별명입니다")
      }else {
        await nationControlUseCase.changeNickName(this.nickName);
        this.$store.state.userInfo.nickName = this.nickName;
        this.$forceUpdate()
        this.dialog=false
        this.$swal("수정 되었습니다.")
      }
    }
  }
})
export type NickNameSheetType = InstanceType<typeof NickNameSheet>;
export default NickNameSheet;
</script>
<style scoped>
.NickNameDialogRoot {
  padding: 21px 25px 0px;
  border-radius: 10px 10px 0px 0px;
  background-color: #fff;
}
.NickNameDialogRoot .dialogTitle {
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 18px;
  color: #242424;
}
.NickNameDialogRoot .dialogSubTitle{
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 13px;
  color: #242424;
  margin-top: 19px;
}
.actions{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.warningText{
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 11px;
  color: #8c8f95;

}
.inputNickName{
  margin: 11px 0px;
}
.cancelBtn{
  height: 47px;
  border-radius: 23.5px;
  background: #fff;
  border: 1px solid #242424;
  flex-grow: 1;
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  color: #242424;
  margin-right: 5px;

}
.setBtn{
  height: 47px;
  border-radius: 23.5px;
  background: #242424;
  flex-grow: 1;
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  color: #fff;
  margin-left: 5px;
}

.actions{
  margin-top: 9px;
  padding: 0px 10px 28px;
}
</style>
<style>
.NickNameDialogRoot fieldset{
  border: unset !important;
}
</style>
