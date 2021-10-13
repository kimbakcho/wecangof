<template>
  <div class="logout" @click="logout">
    <div>
      로그아웃
    </div>
    <img src="@/assets/userlefticon.png">
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {MutationTypes} from "@/store/mutations";
import axios from "axios";

export default Vue.extend({
  methods:{
    logout(){
      let userInfo = this.$store.state.userInfo;
      this.$store.commit(MutationTypes.SET_ISLOGIN,false)
      this.$store.commit(MutationTypes.SET_ISUSERINFO,{})
      let headers: any = axios.defaults.headers;
      headers['Authorization'] = ''
      this.$cookies.remove("wSesstion","/",process.env.VUE_APP_COOKIE_DOMAIN)
      this.$router.push({
        path: "/"
      })
    }
  },

})
</script>
<style scoped>
.logout{
  width: 100%;
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e9ebf4;
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 15px;
  color: #242424;
  padding: 18px;
}
.logout img{
  width: 18px;
  height: 18px;
}
</style>
