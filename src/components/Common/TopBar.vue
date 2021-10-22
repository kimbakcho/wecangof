<template>
  <div class="topBar" :style="{backgroundColor: bgColor}">
    <div class="back" @click="back">
      <v-icon size="15" color="#323232">
        wc-backarrow
      </v-icon>
    </div>
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
.back{
  margin-left: 24px;
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
  margin-right: 24px;
}
</style>
