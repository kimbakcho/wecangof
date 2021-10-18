<template>
  <div class="userProfile">
    <img :src="userInfo.profileImage" >
    <div>
      {{ userInfo.nickName }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";

export default Vue.extend({
  props:{
    userInfo:{
      type: Object as PropType<MemberManagementSimpleResDto>,
      required: true
    }
  }
})
</script>
<style scoped>
.userProfile{
  display: flex;
  align-items: center;
}
.userProfile img{
  border-radius: 50%;
  object-fit: cover;
  width: 25px;
  height: 25px;
}
.userProfile div{
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 10px;
  color: #242424;
  margin-left: 5px;
}
</style>
