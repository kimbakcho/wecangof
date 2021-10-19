<template>
  <div class="topBar" :style="{backgroundColor: bgColor}">
    <img src="@/assets/back_button.png"
         class="back_button" @click="back">
    <div class="topTitle">
      {{title}}
    </div>
    <div class="endItem">
      <slot name="endSlot">

      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props:{
    title:{
      type: String,
      required: true
    },
    bgColor:{
      type: String,
      default: "white"
    },

  },
  methods:{
    back(){
      this.$router.back()
    }
  }
})
</script>
<style scoped>

.topBar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 63px;
  background-color: white;
}

.topBar img {
  width: 19px;
  height: 15px;
  margin-left: 25px;
}

.topBar .topTitle{
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.divider {
  height: 1px;
  margin: 24px 0 0;
  background-color: #e9ebf4;
}
.endItem{
  margin-right: 15px;
}
</style>
