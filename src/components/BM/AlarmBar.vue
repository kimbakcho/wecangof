<template>
  <div class="barRoot" @click="clickAlarmBar">
    <v-icon color="#2661F1" size="18">
      wc-alarmbell
    </v-icon>
    <div class="messageText">
      {{alarmDto.message}}
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {UserAlarmResDto} from "@/Bis/UserAlarm/Dto/UserAlarmResDto";

export default Vue.extend({
  props:{
    alarmDto: {
      type: Object as PropType<UserAlarmResDto>,
      required: true
    }
  },
  methods:{
    clickAlarmBar(){
      if(this.alarmDto.relationNationId){
        console.log("")
        this.$router.push({
          path:`/BM004/${this.alarmDto.relationNationId.id}`
        })
      }
    }
  }
})
</script>
<style scoped>
.barRoot{
  width: 100%;
  height: 60px;
  background: #fff;
  padding: 17px 24px;
  display: flex;
  align-items: center;
}
.messageText{
  margin-left: 5px;
  font-family: "Noto Sans CJK KR";
  font-weight: normal;
  font-size: 12px;
  text-align: left;
  color: #15171c;
}
</style>
