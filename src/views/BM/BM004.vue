<template>
  <div class="root">
    <div class="topFix">
      <TopBar title="여행 준비하기">
        <template v-slot:endSlot>
          <div @click="shareCopy">
            <v-icon size="16" color="#242424">
              wc-share
            </v-icon>
          </div>
        </template>
      </TopBar>

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
import TopBar from "@/components/Common/TopBar.vue";

export default Vue.extend({
  components: {
    TravelCard1, TravelBookMarkBtn, NationDeatilInfo, TopBar
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
      hasAlarmTravelFlag: false,
    }
  },
  mounted(){
    this.$gtag.event('BM004ViewPage', { nationId: this.nationId,nationIdName: this.immigrationStatusDetailResDto.nation.nationName })
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
    shareCopy(){
      this.$copyText(window.location.href).then(()=>{
        this.$swal("주소가 복사 되었습니다.")
      },()=>{
        this.$swal("주소에 실패 하였습니다..")
      })
    }
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
  height: calc(var(--vh, 1vh) * 100);
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

.content{
  padding-top: 60px;
  overflow-y: auto;
}
.divider {
  height: 1px;
  margin: 0px 0 0;
  background-color: #e9ebf4;
}
.travelCard{
  padding: 21px 25px;
}

.bookMarkBtn {
  padding: 0 25px 19px;
  margin: 15px 0px;
}

</style>
