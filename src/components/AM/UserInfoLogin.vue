<template>
  <div class="profileBtn" @click="mainBtnClick">
    <div class="contentBar">
      <div class="profileImage" :style="{backgroundImage: getProfileImage()}" >
        <input v-if="isLogin()" id="profileAttach" type="file" accept="image/png, image/jpeg" @input="changeProfileImage">
        <label v-if="isLogin()" for="profileAttach" >
          <div class="profileAttach">
            <v-icon size="12" >
              fas fa-camera
            </v-icon>
          </div>

        </label>
      </div>
      <div class="profileText">
        <div class="userId">
          {{ getUserId() }}
        </div>
        <div class="userName">
          {{ getUserName() }}
        </div>
      </div>
      <img src="@/assets/userlefticon.png">
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import FileUploadService from "@/Bis/Common/FileUploadService";
import MemberManagementUseCase from "@/Bis/MemberManagement/Domain/UseCase/MemberManagementUseCase";
import axios from "axios";
import {MutationTypes} from "@/store/mutations";
import UserInfo from "@/Bis/Common/UserInfo";

export default Vue.extend({
  methods:{
    isLogin(){
      return this.$store.state.isLogin;
    },
    getProfileImage(){
      if(this.$store.state.userInfo.profileImage){
        return `url(${this.$store.state.userInfo.profileImage})`
      }else {
        return `url(${require("@/assets/account_ico.png")})`
      }
    },
    async changeProfileImage(file: any){
      let fileUploadService = new FileUploadService();
      let uploadFileResDto = await fileUploadService.upload(this,file.target.files[0]);
      let memberManagementUseCase = new MemberManagementUseCase();
      if(uploadFileResDto != null){
        await memberManagementUseCase.changeProfileImage(uploadFileResDto.imageUrl);
        let {data} = await axios.get("/MemberManagement/me");
        let userInfo = {};
        Object.assign(userInfo, data);
        this.$store.commit(MutationTypes.SET_ISUSERINFO, userInfo as UserInfo)
        this.$forceUpdate()
      }

    },
    getUserId(){
      if(this.isLogin()){
        return this.$store.state.userInfo.uid;
      }else {
        return "로그인해주세요"
      }
    },
    getUserName(){
      if(this.isLogin()){
        return this.$store.state.userInfo.nickName;
      }else {
        return "로그인 정보가 없습니다"
      }
    },
    mainBtnClick(){
      if(this.isLogin()){
        console.log("페이지 이동")
      }else {
        this.$router.push({
          path:"/UA001"
        })
      }

    }
  }
})
</script>
<style scoped>
.profileBtn{
  width: 100%;
  height: 90px;
  border-radius: 10px;
  background: #fff;
  padding: 18px;
}
.contentBar{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.contentBar img{
  width: 18px;
  height: 18px;
}
.profileImage{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-position: center center;
  background-size: cover;
  position: relative;
}
.profileText{
  margin-left: 15px;
  flex-grow: 1;
}
.profileText .userId{
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 15px;
  text-align: left;
  color: #242424;
  max-width: 150px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.profileText .userName{
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 13px;
  text-align: left;
  color: #a7aab2;
}
#profileAttach {
  display: none;
}
.profileAttach{
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #8c8f95;
  position: absolute;
  top: 65%;
  left: 65%;
}
</style>
