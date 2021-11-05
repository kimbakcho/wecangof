<template>
  <div class="BM002Root">
    <TopBar title="알림" bg-color="#e9ebf4">

    </TopBar>
    <div class="content">
      <div v-for="item in userAlarms" :key="item.id" class="alarm">
        <AlarmBar :alarm-dto="item">

        </AlarmBar>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import TopBar from "@/components/Common/TopBar.vue";
import {Route} from "vue-router";
import {UserAlarmResDto} from "@/Bis/UserAlarm/Dto/UserAlarmResDto";
import UserAlarmUseCase from "@/Bis/UserAlarm/Domain/UseCase/UserAlarmUseCase";
import AlarmBar from "@/components/BM/AlarmBar.vue";

export default Vue.extend({
  props:{
    userAlarms:{
      type: Array as PropType<UserAlarmResDto[]>,
      required: true
    }
  },
  components:{
    AlarmBar,
    TopBar
  },

  async beforeRouteEnter(to: Route, from: Route, next: any) {
    let userAlarmUseCase = new UserAlarmUseCase();
    let params: any = to.params;
    params.userAlarms = await userAlarmUseCase.myAlarms();
    userAlarmUseCase.readAlarm()
    next();
  }
})
</script>
<style scoped>
.BM002Root {
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: white;
  z-index: 10;
}
.content{
  width: 100%;
  height: 100%;
  background-color: #f4f5fc;
  padding-top: 35px;
  overflow: auto;
}
.content .alarm{
  margin-bottom: 19px;
}
</style>
