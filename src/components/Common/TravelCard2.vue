<template>
  <div >
    <div class="bg" @click="tapCard">
      <div class="top">
        <div class="nation">
          <img :src="getFlagImage()" >
          <div>
            {{immigrationStatusCardDto.nation.nationName}}
          </div>
        </div>
        <div class="travelChip">
          <TravelChip :can-travel="immigrationStatusCardDto.travelFlag">

          </TravelChip>
        </div>
      </div>
      <div>
        <div class="vaccination">
          <div class="vaccinationTitle">
            <div>
              <v-icon color="#a7aab2" size="5">
                fas fa-capsules
              </v-icon>
            </div>
            <div class="text">
              백신접종
            </div>
          </div>
          <div class="vaccinationInfo" :class="{ active: immigrationStatusCardDto.vaccinationFlag }">
            <div class="vaccinationNeed" :class="{ active: immigrationStatusCardDto.vaccinationFlag }">

            </div>
            <div class="text">
              {{vaccinationText}}
            </div>
          </div>
        </div>

        <div class="pcrTest">
          <div class="pcrTestTitle">
            <div>
              <v-icon color="#a7aab2" size="5">
                fas fa-capsules
              </v-icon>
            </div>
            <div class="text">
              PCR검사
            </div>
          </div>
          <div class="pcrTestInfo">
            <div class="text">
              {{immigrationStatusCardDto.pcrTest ? immigrationStatusCardDto.pcrTest : "없음" }}
            </div>
          </div>
        </div>

        <div class="mandatoryQuarantine">
          <div class="mandatoryQuarantineTitle">
            <div>
              <v-icon color="#a7aab2" size="5">
                far fa-calendar-plus
              </v-icon>
            </div>
            <div class="text">
              의무 격리기간
            </div>
          </div>
          <div class="mandatoryQuarantineInfo">
            <div class="text">
              {{immigrationStatusCardDto.mandatoryQuarantineText ? immigrationStatusCardDto.mandatoryQuarantineText : "없음" }}
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"

import TravelChip from "@/components/Common/TravelChip.vue";
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";

export default Vue.extend({
  components:{
    TravelChip
  },
  props:{
    immigrationStatusCardDto: {
      type: Object as PropType<ImmigrationStatusSimpleResDto>,
      required: true
    }
  },
  data(){
    return {
      vaccinationText: ""
    }
  },
  watch:{
    immigrationStatusCardDto: function (value) {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods:{
    init(){
      if(this.immigrationStatusCardDto.vaccinationFlag){
        this.vaccinationText = "필수"
      }else {
        this.vaccinationText = "무관"
      }
    },
    getFlagImage(){
      return this.immigrationStatusCardDto.nation.flagImage
    },
    tapCard(){
      this.$emit("tapCard",this.immigrationStatusCardDto)
    }
  }
})

</script>
<style scoped>

.bg {
  padding: 19px 20px 20px;
  border: solid 1px #a7aab2;
  border-radius: 10px;
  box-shadow: 0 10px 25px 0 rgba(17, 18, 20, 0.08);
  background-color: #fff;
}
.top{
  display: flex;
  justify-content: space-between;
}

.nation img{
  width: 35px;
  height: 20px;
}
.nation div{
  font-family: Noto Sans KR;
  font-size: 18px;
  color: #242424;
}
.vaccination{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.pcrTest {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.mandatoryQuarantine{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}

.vaccinationInfo, .pcrTestInfo, .mandatoryQuarantineInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: NotoSansKR;
  font-size: 13px;
  color: #15171c;
}
.vaccinationInfo .text{
  margin-left: 5px;
}
.vaccinationInfo.active{
  color: #ef265c;
}

.vaccinationTitle, .pcrTestTitle, .mandatoryQuarantineTitle{
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: NotoSansKR;
  font-size: 13px;
  color: #a7aab2;
}
.vaccinationTitle .text, .pcrTestTitle .text, .mandatoryQuarantineTitle .text{
  margin-left: 5px;
}

.vaccinationNeed {
  width: 8px;
  height: 8px;
  border-radius: 15px;
  background-color: #15171c;
}
.vaccinationNeed.active {
  background-color: #ef265c;
}

</style>
