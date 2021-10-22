<template>
  <div>
    <div class="bg" @click="tapCard">
      <div class="top">
        <div class="nation">
          <img :src="getFlagImage()">
          <div>
            {{ immigrationStatusCardDto.nation.nationName }}
          </div>
        </div>
        <div class="travelChip">
          <TravelChip :can-travel="immigrationStatusCardDto.travelFlag">

          </TravelChip>
        </div>
      </div>
      <div v-if="immigrationStatusCardDto.travelFlag">
        <div class="vaccination">
          <div class="vaccinationTitle">
            <div>
              <v-icon color="#a7aab2" size="5">
                wc-inject
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
              {{ vaccinationText }}
            </div>
          </div>
        </div>

        <div class="pcrTest">
          <div class="pcrTestTitle">
            <div>
              <v-icon color="#a7aab2" size="5">
                wc-vaccinecard
              </v-icon>
            </div>
            <div class="text">
              PCR검사
            </div>
          </div>
          <div class="pcrTestInfo">
            <div class="text">
              {{ immigrationStatusCardDto.pcrTest ? immigrationStatusCardDto.pcrTest : "없음" }}
            </div>
          </div>
        </div>

        <div class="mandatoryQuarantine">
          <div class="mandatoryQuarantineTitle">
            <div>
              <v-icon color="#a7aab2" size="5">
                wc-calender
              </v-icon>
            </div>
            <div class="text">
              의무 격리기간
            </div>
          </div>
          <div class="mandatoryQuarantineInfo">
            <div class="text">
              {{
                immigrationStatusCardDto.mandatoryQuarantineText ? immigrationStatusCardDto.mandatoryQuarantineText : "없음"
              }}
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alarmBtn" :class="{active: isAlarmActive}" @click="travelAlarmClick">
          <div class="text">
            여행이 가능해지면 알려드릴게요!
          </div>

          <v-icon size="15" v-if="!isAlarmActive">
            wc-envelope
          </v-icon>
          <v-icon size="15" v-else>
            wc-envelopeopen
          </v-icon>

        </div>

      </div>

    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"

import TravelChip from "@/components/Common/TravelChip.vue";
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";
import AlarmTravelFlagUseCase from "@/Bis/AlarmTravelFlag/Domain/UseCase/AlarmTravelFlagUseCase";

export default Vue.extend({
  components: {
    TravelChip
  },
  props: {
    immigrationStatusCardDto: {
      type: Object as PropType<ImmigrationStatusSimpleResDto>,
      required: true
    },
    isAlarmActive: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      vaccinationText: ""
    }
  },
  created() {
    if (this.immigrationStatusCardDto.vaccinationFlag) {
      this.vaccinationText = "필수"
    } else {
      this.vaccinationText = "무관"
    }
  },
  methods: {
    getFlagImage() {
      return this.immigrationStatusCardDto.nation.flagImage
    },
    tapCard() {
      this.$emit("tapCard", this.immigrationStatusCardDto)
    },
    travelAlarmClick(){
      if(!this.$store.state.isLogin){
        this.$swal("로그인이 필요합니다.")
        return ;
      }
      let alarmTravelFlagUseCase = new AlarmTravelFlagUseCase();
      if(!this.isAlarmActive) {
        alarmTravelFlagUseCase.saveTravelFlag(this.immigrationStatusCardDto.nation.id)
      }else {
        alarmTravelFlagUseCase.deleteTravelFlag(this.immigrationStatusCardDto.nation.id)
      }
      this.$emit("update:isAlarmActive",!this.isAlarmActive)
    }
  }
})

</script>
<style scoped>

.bg {
  padding: 19px 20px 20px;
  border-radius: 10px;
  box-shadow: 0 10px 25px 0 rgba(17, 18, 20, 0.08);
  background-color: #f4f5fc;
}

.top {
  display: flex;
  justify-content: space-between;
}

.nation img {
  width: 35px;
  height: 20px;
  border-radius: 4px;
}

.nation div {
  font-family: Noto Sans KR;
  font-size: 18px;
  color: #242424;
}

.vaccination {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.pcrTest {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.mandatoryQuarantine {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}

.vaccinationInfo, .pcrTestInfo, .mandatoryQuarantineInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR";
  font-size: 13px;
  color: #15171c;
}

.vaccinationInfo .text {
  margin-left: 5px;
}

.vaccinationInfo.active {
  color: #ef265c;
}

.vaccinationTitle, .pcrTestTitle, .mandatoryQuarantineTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR";
  font-size: 13px;
  color: #a7aab2;
}

.vaccinationTitle .text, .pcrTestTitle .text, .mandatoryQuarantineTitle .text {
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

.alarmBtn {
  margin-top: 40px;
  width: 100%;
  height: 59px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 14px;
  color: #a7aab2;
}
.alarmBtn .text{
  margin-right: 5px;
}

.alarmBtn.active {
  background: #2661f1;
  border: unset;
  color: #fff;
}
.alarmBtn.active i {
  color: black;
}

.vaccinationTitle i {
  margin-right: 4px;
}
.pcrTestTitle i {
  margin-right: 4px;
}
.mandatoryQuarantineTitle i {
  margin-right: 4px;
}

</style>
