<template>

  <div class="UA003Root">
    <TopBar title=""></TopBar>
    <div class="UA003title">
      회원가입
    </div>
    <div class="UA003subTitle">
      아래 정보를 입력해주세요.
    </div>
    <div class="nickNameInputF">
      <div class="nickNameTitle">
        별명
      </div>
      <div>
        <input class="nickNameInput" type="text" placeholder="이름을 입력해주세요" v-model="nickName">
      </div>
    </div>
    <div class="termsCheck">
      <v-checkbox readonly label="이용약관 동의" v-model="termsAgree" @click="onOpenTerms"> </v-checkbox>
    </div>
    <div class="termsCheck">
      <v-checkbox readonly label="사용자 제작 콘텐츠 이용약관 동의" v-model="userMakeTermsAgree" @click="onOpenUserMakeTerms"> </v-checkbox>
    </div>
    <TermsConditionDialog ref="TermsConditionDialogForTerms"  @agreement="onTermsAgreement" @deny="onTermsDeny">
    </TermsConditionDialog>
    <TermsConditionDialog ref="TermsConditionDialogForUserMakeTerms"  @agreement="onTermsUserMakerAgreement" @deny="onTermsUserMakerDeny">
    </TermsConditionDialog>
    <div class="joinBtn" @click="onJoin">
      회원가입
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {VueConstructor} from "vue"
import TopBar from "@/components/Common/TopBar.vue";
import TermsConditionDialog, {TermsConditionDialogType} from "@/components/UA/TermsConditionDialog.vue";
import MemberManagementUseCase from "@/Bis/MemberManagement/Domain/UseCase/MemberManagementUseCase";

export default (Vue as VueConstructor<Vue & {
  $refs:{
    TermsConditionDialogForTerms: TermsConditionDialogType,
    TermsConditionDialogForUserMakeTerms: TermsConditionDialogType
  }
}>).extend({
  components:{
    TopBar, TermsConditionDialog
  },
  data(){
    return {
      termsAgree: false,
      userMakeTermsAgree: false,
      nickName: ""
    }
  },
  created() {
    this.nickName = this.$store.state.memberJoinReqDto.nickName;
  },
  methods:{
    onTermsAgreement(){
      this.termsAgree = true;
    },
    onTermsDeny(){
      this.termsAgree = false;
    },
    onTermsUserMakerAgreement(){
      this.userMakeTermsAgree = true;
    },
    onTermsUserMakerDeny(){
      this.userMakeTermsAgree = false;
    },
    onOpenTerms(){
      this.$refs.TermsConditionDialogForTerms.open("이용약관",7)
    },
    onOpenUserMakeTerms(){
      this.$refs.TermsConditionDialogForUserMakeTerms.open("사용자 제작 콘텐츠 이용약관",22);
    },
    async onJoin(){
      if(!this.termsAgree){
        this.$swal("이용 약관에 동의 하여야 가입이 가능합니다.")
        return ;
      }
      if(!this.userMakeTermsAgree){
        this.$swal("사용자 제작 콘텐츠 이용약관에 동의 하여야 가입이 가능합니다.")
        return ;
      }
      if(!this.nickName){
        this.$swal("닉네임이 필요 합니다.")
        return ;
      }
      let memberManagementUseCase = new MemberManagementUseCase();
      let check = await memberManagementUseCase.checkNickName(this.nickName);
      if(check){
        this.$swal("이미 존재하는 닉네임 입니다.")
        return ;
      }

      this.$store.state.memberJoinReqDto.nickName = this.nickName;

      try{
        let memberJoinResDto = await memberManagementUseCase.join(this.$store.state.memberJoinReqDto);

        this.$cookies.set("wSesstion", memberJoinResDto.token)
        this.$store.state.memberJoinReqDto.pw = "";
        await this.$router.push({
          path: "/"
        })
      }catch (e: any) {
        this.$swal(e.response.data.message)
      }


    }
  }
})
</script>
<style scoped>
.UA003root {
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: white;
  z-index: 12;
}
.nickNameInput {
  height: 51px;
  border-radius: 5px;
  background: #e9ebf4;
}
.UA003title{
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 15px;
  color: #242424;
  margin-top: 17px;
}
.termsCheck{
  margin-left: 25px;
}
.UA003subTitle{
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 13px;
  color: #8c8f95;
  margin-top: 19px;
}
.nickNameInputF{
  padding: 25px;
}
.nickNameTitle{
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 13px;
  color: #242424;
}
.nickNameInput{
  margin-top: 14px;
  padding: 17px;
  width: 100%;
}
.joinBtn{
  height: 47px;
  border-radius: 23.5px;
  background: #242424;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 12px;
  color: #fff;
  margin: 0px 24px;
  cursor: pointer;
}
</style>
