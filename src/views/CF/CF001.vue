<template>
  <div class="CF001root">
    <div class="search">
      <v-autocomplete :items="nations" class="nations" label="국가" item-text="nationName" item-value="id" v-model="selectNation">

      </v-autocomplete>
      <v-btn @click="sendMessage">
        보내기
      </v-btn>

    </div>
    <v-textarea label="메세지" v-model="message" class="message">

    </v-textarea>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import NationControlUseCase from "@/Bis/NationControl/Domain/UseCase/NationControlUseCase";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import UserAlarmUseCase from "@/Bis/UserAlarm/Domain/UseCase/UserAlarmUseCase";
import {UserAlarmReqDto} from "@/Bis/UserAlarm/Dto/UserAlarmReqDto";

export default Vue.extend({

  data(){
    return {
      nations: [] as NationControlResDto[],
      selectNation: '',
      message: "",
    }
  },
  async mounted() {
    let nationControlUseCase = new NationControlUseCase();
    this.nations = await nationControlUseCase.getFilter({});
  },
  methods:{
    async sendMessage(){
      let userAlarmUseCase = new UserAlarmUseCase();
      let reqDto = {} as UserAlarmReqDto;
      if(this.selectNation){
        reqDto.nationId = Number(this.selectNation)
      }
      if(this.message){
        reqDto.message = this.message
      }

      await userAlarmUseCase.sendAlarm(reqDto)

      this.message = ''
      this.selectNation = ''

      this.$swal("알람을 전송 하였습니다.")
    }
  }
})
</script>
<style scoped>
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 50%;
  padding: 25px;
}
.nations{
  max-width: 200px;
}
.message{
  max-width: 50%;
  padding: 25px;
}
</style>
