<template>
  <div>

  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({

  mounted() {
    let win: any = window
    let naver_id_login: any = new win.naver_id_login(process.env.VUE_APP_NAVER_CLIENT_ID, process.env.VUE_APP_NAVER_CALLBACK_URL);
    location.href= `${process.env.VUE_APP_NAVER_BACKEND_REDIRECT_URL}?token=${naver_id_login.oauthParams.access_token}`
  }

})
</script>
<style scoped>

</style>
