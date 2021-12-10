<template>
  <div class="root">
    <TopBar title="마이페이지">

    </TopBar>
    <div class="amContent">
      <div>
        <UserInfoLogin @reqNickNameOpen="nickNameOpen"></UserInfoLogin>
        <TermsConditions text="이용약관" link="/BC001/7" class="termsConditions"></TermsConditions>
        <TermsConditions text="사용자 제작 콘텐츠 이용 약관" link="/BC001/22" class="termsConditions"></TermsConditions>
        <Logout v-if="isLogin()" class="logout"></Logout>
      </div>
    </div>
    <NickNameSheet ref="NickNameSheet">

    </NickNameSheet>
  </div>
</template>
<script lang="ts">
import Vue, {VueConstructor} from "vue"
import TopBar from "@/components/Common/TopBar.vue";
import UserInfoLogin from "@/components/AM/UserInfoLogin.vue";
import TermsConditions from "@/components/AM/TermsConditions.vue";
import Logout from "@/components/AM/Logout.vue";
import NickNameSheet, {NickNameSheetType} from "@/components/AM/NickNameSheet.vue";

export default (Vue as VueConstructor<Vue & {
  $refs:{
    NickNameSheet: NickNameSheetType
  }
}>).extend({
  components:{
    TopBar, UserInfoLogin, TermsConditions, Logout, NickNameSheet
  },
  methods: {
    isLogin(){
      return this.$store.state.isLogin;
    },
    nickNameOpen(){
      this.$refs.NickNameSheet.open();
    }
  }
})
</script>
<style scoped>
.root {
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: white;
  z-index: 10;
}

.amContent{
  height: calc(calc(var(--vh, 1vh) * 100) - 63px);
  width: 100%;
  background-color: #F4F5FC;
  padding: 40px 25px;
}

.termsConditions{
  margin-top: 10px;
}

.logout{
  margin-top: 10px;
}

</style>
