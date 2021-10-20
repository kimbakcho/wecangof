<template>
  <div class="root">
    <div class="topFix">
      <div class="topBar">
        <img src="@/assets/back_button.png"
             class="back_button" @click="back">
        <div>
          여행 준비하기
        </div>
        <div>
          <v-icon size="15">
            fas fa-share-alt
          </v-icon>
        </div>
      </div>
      <div class="divider"></div>
    </div>
    <div class="content">
      <div class="travelCard">
        <TravelCard1 :immigrationStatusCardDto="immigrationStatusCardResDto" :is-alarm-active.sync="hasAlarmTravelFlag">

        </TravelCard1>
      </div>
      <div class="bookMarkBtn">
        <TravelBookMarkBtn :nation-id="Number(nationId)" :has-book-mark.sync="bookMarkingFlag">

        </TravelBookMarkBtn>
      </div>
      <NationDeatilInfo :immigration-status-detail-res-dto="immigrationStatusDetailResDto">

      </NationDeatilInfo>
    </div>



  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {Route} from "vue-router";
import ImmigrationStatusUseCase from "@/Bis/ImmigrationStatus/Domain/UseCase/ImmigrationStatusUseCase";
import {ImmigrationStatusDetailResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusDetailResDto";
import TravelCard1 from "@/components/Common/TravelCard1.vue";
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";
import TravelBookMarkBtn from "@/components/Common/TravelBookMarkBtn.vue";
import UserBookMarkingCountryUseCase from "@/Bis/UserBookMarkingCountry/Domain/UseCase/UserBookMarkingCountryUseCase";
import {UserBookMarkingCountryResDto} from "@/Bis/UserBookMarkingCountry/Dto/UserBookMarkingCountryResDto";
import NationDeatilInfo from "@/components/Common/NationDeatilInfo.vue";
import AlarmTravelFlagUseCase from "@/Bis/AlarmTravelFlag/Domain/UseCase/AlarmTravelFlagUseCase";

export default Vue.extend({
  components: {
    TravelCard1, TravelBookMarkBtn, NationDeatilInfo
  },
  props: {
    nationId: {
      type: String,
      required: true
    },
    immigrationStatusDetailResDto: {
      type: Object as PropType<ImmigrationStatusDetailResDto>,
      required: true
    },
    immigrationStatusCardResDto: {
      type: Object as PropType<ImmigrationStatusSimpleResDto>,
    },
    bookMarking: [Object,String],
    pHasAlarmTravelFlag: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      bookMarkingFlag: false,
      hasAlarmTravelFlag: false
    }
  },
  created() {
    if(this.bookMarking){
      this.bookMarkingFlag = true
    }
    if(this.pHasAlarmTravelFlag){
      this.hasAlarmTravelFlag = true;
    }
  },
  methods: {
    back() {
      this.$router.back();
    },

  },
  async beforeRouteEnter(to: Route, from: Route, next: any) {


    let immigrationStatusUseCase = new ImmigrationStatusUseCase();
    const immigrationStatusDetailResDto = await immigrationStatusUseCase.getNationInfo(Number(to.params.nationId));
    const userBookMarkingCountryUseCase = new UserBookMarkingCountryUseCase()
    const bookMarking = await userBookMarkingCountryUseCase.isBookMarking(Number(to.params.nationId))
    const params:any =  to.params
    let alarmTravelFlagUseCase = new AlarmTravelFlagUseCase();
    let hasTravelFlag = await alarmTravelFlagUseCase.hasTravelFlag(Number(to.params.nationId));
    if(hasTravelFlag){
      params.pHasAlarmTravelFlag = true;
    }else {
      params.pHasAlarmTravelFlag = false;
    }

    params["immigrationStatusDetailResDto"] = immigrationStatusDetailResDto
    let immigrationStatusCardDto = {} as ImmigrationStatusSimpleResDto
    Object.assign(immigrationStatusCardDto, immigrationStatusDetailResDto);
    params["immigrationStatusCardResDto"] =  immigrationStatusCardDto
    params["bookMarking"] = bookMarking

    next();
  }

})
</script>
<style scoped>
.root {
  height: 100vh;
  width: 100vw;
  background-color: white;
  z-index: 11;

}

.topFix{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 100;
}
.topBar {
  margin-top: 12px;
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-weight: bold;
}
.content{
  padding-top: 60px;
  overflow-y: auto;
}
.divider {
  height: 1px;
  margin: 24px 0 0;
  background-color: #e9ebf4;
}
.travelCard{
  padding: 21px 25px;
}

.bookMarkBtn {
  padding: 0 25px 19px;
}

</style>
