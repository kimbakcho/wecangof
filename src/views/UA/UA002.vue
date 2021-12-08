<template>
  <div>

  </div>
</template>
<script lang="ts">
import Vue from "vue"
import MemberManagementUseCase from "@/Bis/MemberManagement/Domain/UseCase/MemberManagementUseCase";
import SnsLoginUseCase from "@/Bis/Login/UseCase/SnsLoginUseCase";

export default Vue.extend({
  props: {
    uid: {
      type: String,
      required: true
    },
    fromJoin: {
      type: String,
      required: true
    },
    nickName: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    signToken: {
      type: String
    }
  },
  async mounted(){
    let memberManagementUseCase = new MemberManagementUseCase();
    let isJoined = await memberManagementUseCase.isJoined(this.uid);
    if (isJoined) {
      let snsLoginUseCase = new SnsLoginUseCase();
      let loginToken = await snsLoginUseCase.getSnsLoginToken(this.signToken);
      this.$cookies.set("wSesstion", loginToken)
      await this.$router.push({
        path: "/"
      })
    }else {
      await this.gotoJoinPage();
    }
  },methods: {
    async gotoJoinPage() {
      this.$store.state.memberJoinReqDto.fromJoin = this.fromJoin;
      this.$store.state.memberJoinReqDto.snsUid = this.uid;
      this.$store.state.memberJoinReqDto.nickName= this.nickName;
      this.$store.state.memberJoinReqDto.snsSignToken = this.signToken;
      this.$store.state.memberJoinReqDto.profileImage = this.profileImage;
      await this.$router.replace("/UA003")
    }
  }

})
</script>
<style scoped>

</style>
