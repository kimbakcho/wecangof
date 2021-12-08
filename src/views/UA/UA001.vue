<template>
  <div class="UA001root">
    <top-bar title=""></top-bar>
    <div>
      <div class="kakaoTalkLogin" @click="kakaoLogin">
        <img src="@/assets/kakao_ico.png"
             class="kakao_ico">
        <div>
          카카오톡으로 로그인
        </div>
      </div>

      <div id="naver_id_login"></div>
      <div class="naverLogin" @click="naverLoginClick">
        <img src="@/assets/naver_ico.png"
             class="naver_ico">
        <div>
          네이버로 로그인
        </div>
      </div>

      <div class="googleLogin" @click="googleLoginClick">
        <img src="@/assets/google_ico_color.png"
             class="google_ico_color">
        <div>
          구글로 로그인
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import TopBar from "@/components/Common/TopBar.vue";

function onSignIn(googleUser: any) {
  console.log("googleUser")
  console.log(googleUser)
}

export default Vue.extend({
  components:{
    TopBar
  },

  data() {
    return {
      naverLogin: {} as any,
      gauth2: {} as any
    }
  },
  methods: {
    back() {
      return this.$router.back()
    },
    kakaoLogin() {
      this.$gtag.event('login', { method: 'kakao' })
      location.href=`https://kauth.kakao.com/oauth/authorize?client_id=b99d3c5a3a2d0b73fd79172539d710e5&redirect_uri=${process.env.VUE_APP_KAKAOREDIRECT}&response_type=code`
    },
    naverLoginClick() {
      this.$gtag.event('login', { method: 'naver' })
      let naver_id_loginTag: any = document.getElementById("naver_id_login");
      let btnNaverLogin = naver_id_loginTag.firstChild;
      btnNaverLogin.click();
    },
    googleLoginClick(){
      this.$gtag.event('login', { method: 'Google' })
      location.href="https://accounts.google.com/o/oauth2/v2/auth?" +
          "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid&" +
          "access_type=offline&" +
          "include_granted_scopes=true&" +
          "state=state_parameter_passthrough_value&" +
          `redirect_uri=${process.env.VUE_APP_GOOGLE_REDIRECT_URL}&` +
          "response_type=code&" +
          "client_id=352727726767-nuvi74gsk08hf746r14c1i2j2s7l6d2o.apps.googleusercontent.com";
    }
  },
  mounted() {
    let naver_id_login: any = new window.naver_id_login(process.env.VUE_APP_NAVER_CLIENT_ID, process.env.VUE_APP_NAVER_CALLBACK_URL);
    naver_id_login.setDomain(process.env.VUE_APP_NAVER_SERVICE_URL);
    naver_id_login.init_naver_id_login();
  }
})
</script>
<style scoped>
.UA001root {
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: white;
  z-index: 12;
}

.title span {
  height: 21px;
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #242424;
}

.id span, .pw span {
  height: 19px;
  font-family: "Noto Sans KR";
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #242424;
}

#emailId, #password {
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #e9ebf4;
  height: 51px;
  padding: 15px;
}

.loginBtn {
  height: 47px;
  margin: 39px 25px 25px;
  border-radius: 38px;
  background-color: #242424;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Noto Sans KR";
  font-size: 12px;
}

.joinActions {
  margin: 25px 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Noto Sans KR";
  font-size: 15px;
}

.joinActions div:nth-child(1) {
  color: #2661f1;
}

.snsTitle {
  font-family: "Noto Sans KR";
  font-size: 15px;
  color: #242424;
  text-align: center;
  font-weight: bold;
}

.kakaoTalkLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 25px 15px 25px;
  height: 61px;
  border-radius: 38px;
  font-family: "Noto Sans KR";
  font-size: 15px;
  background-color: #fbe54d;
  color: #3b1f1e;
}

.kakaoTalkLogin img {
  width: 22px;
  height: 20px;
  margin: 1px 15px 0 15px;
  object-fit: contain;
}

.naverLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 61px;
  margin: 0px 25px 15px 25px;
  border-radius: 38px;
  background-color: #3bac37;
  font-family: "Noto Sans KR";
  font-size: 15px;
  color: white;
}

.naverLogin img {
  width: 20px;
  height: 20px;
  margin: 1px 15px 0 15px;
  object-fit: contain;
}

.googleLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 61px;
  margin: 0px 25px 15px 25px;
  border-radius: 38px;
  background-color: #fff;
  font-family: "Noto Sans KR";
  font-size: 15px;
  border: solid 1px #a7aab2;
}

.googleLogin img {
  width: 20px;
  height: 20px;
  margin: 1px 15px 0 15px;
  object-fit: contain;
}

#naver_id_login {
  display: none;
}
</style>
