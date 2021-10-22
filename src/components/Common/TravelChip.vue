<template>
  <div class="chip" :class="{ active: canTravel}">
    <div v-if="canTravel" >
      <v-icon color="white" size="7">
        wc-check
      </v-icon>
    </div>
    <div v-else>
      <v-icon color="white" size="7">
        fas fa-times
      </v-icon>
    </div>
    <div class="text">
      {{ message }}
    </div>

  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props:{
    canTravel:{
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      message: ""
    }
  },
  watch:{
    canTravel: function (value){
      this.init()
    }
  },
  methods:{
    init(){
      if(this.canTravel){
        this.message = "여행 가능"
      }else {
        this.message = "여행 불가"
      }
    }
  },
  created() {
    this.init();
  }
})
</script>
<style scoped>
.chip {
  width: 94px;
  height: 29px;
  border-radius: 15px;
  background-color: #ef265c;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chip.active {
  background-color: #2661f1;
}

.chip .text {
  margin-left: 5px;
  font-family: "Noto Sans KR";
  font-size: 12px;
  color: #fff;
}
.chip i {
  margin-right: 4px;
}
</style>
