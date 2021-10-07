<template>
  <div class="root">
    <TopBar title="마이페이지">

    </TopBar>
    <div class="amContent">
      <div>
        <UserInfoLogin></UserInfoLogin>
        <TermsConditions class="termsConditions"></TermsConditions>
        <Logout v-if="isLogin()" class="logout"></Logout>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import TopBar from "@/components/Common/TopBar.vue";
import UserInfoLogin from "@/components/AM/UserInfoLogin.vue";
import TermsConditions from "@/components/AM/TermsConditions.vue";
import Logout from "@/components/AM/Logout.vue";

export default Vue.extend({
  components:{
    TopBar, UserInfoLogin, TermsConditions, Logout
  },
  methods: {
    isLogin(){
      return this.$store.state.isLogin;
    },
  }
})
</script>
<style scoped>
.root {
  height: 100vh;
  width: 100vw;
  background-color: white;
  z-index: 10;
}

.amContent{
  height: calc(100vh - 63px);
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
