<template>
  <div>

  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  mounted(){
    let hash = window.location.hash;
    hash = hash.replace("#",'')
    let params = hash.split("&");
    let id_token = "";
    params.forEach(x=>{
      let items = x.split("=");
      if(items[0]=="id_token"){
        id_token = items[1];
      }
    })
    console.log(id_token)
    location.href=`${process.env.VUE_APP_GOOGLE_BCKEND_REDIRECT_URL}?token=${id_token}`


  }
})
</script>
<style scoped>

</style>
