<template>
  <div class="termsConditions" @click="gotoLink">
    <div>
      {{this.text}}
    </div>
    <img src="@/assets/userlefticon.png">
  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props:{
    text:{
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  methods:{
    gotoLink(){
      this.$router.push({
        path: this.link
      })
    }
  }
})
</script>
<style scoped>
.termsConditions{
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
.termsConditions img{
  width: 18px;
  height: 18px;
}
</style>
