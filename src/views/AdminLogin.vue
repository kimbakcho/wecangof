<template>
  <div class="adminLoginRoot">
    <div class="bg">
      <v-form :action="actionUrl" method="post">
        <v-text-field name="id" type="text" label="id을 입력해주세요" v-model="id" />
        <v-text-field name="pw" type="password" label="pw을 입력해주세요" v-model="pw" />
        <button type="submit" class="loginBtn">
          로그인
        </button>
      </v-form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({

  props:{
    error:{
      type: String
    }
  },
  mounted(){
    if(this.error){
      this.$swal(this.error)
    }
  },
  data(){
    return {
      id: "",
      pw: "",
      actionUrl: `${process.env.VUE_APP_BASE_URL}/weCanGoLogin/adminLogin`
    }
  }
})
</script>
<style scoped>
.adminLoginRoot{
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg{
  width: 300px;
  padding: 25px;

  border-radius: 10px;
  border: solid 1px black;
}
.loginBtn{
  width: 100%;
  background-color: #205bf0;
  border-radius: 10px;
  padding: 10px;
}
</style>
