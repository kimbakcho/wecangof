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
      this.$kakao.Auth.authorize({
        redirectUri: process.env.VUE_APP_KAKAOREDIRECT
      })
    },
    naverLoginClick() {
      let naver_id_loginTag: any = document.getElementById("naver_id_login");
      let btnNaverLogin = naver_id_loginTag.firstChild;
      btnNaverLogin.click();
    },
    googleLoginClick(){
      let win: any = window
      let gapi: any = win.gapi;
      let auth2 = gapi.auth2.getAuthInstance()
      auth2.signIn()
    }
  },
  mounted() {
    let win: any = window
    let naver_id_login: any = new win.naver_id_login(process.env.VUE_APP_NAVER_CLIENT_ID, process.env.VUE_APP_NAVER_CALLBACK_URL);
    naver_id_login.setDomain(process.env.VUE_APP_NAVER_SERVICE_URL);
    naver_id_login.init_naver_id_login();
    let gapi: any = win.gapi;
    gapi.load('auth2', function() {
      gapi.auth2.init({
        "client_id": process.env.VUE_APP_GOOGLE_CLIENT_ID,
        "scope": "profile email",
        "ux_mode": "redirect",
        "fetch_basic_profile": false,
        "redirect_uri": process.env.VUE_APP_GOOGLE_REDIRECT_URL
      })
    });
  }
})
</script>
<style scoped>
.UA001root {
  height: 100vh;
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
