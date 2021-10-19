<template>
  <div class="bg" @click="tapCard">
    <div class="imgbg" :style="{ backgroundImage: `url(${immigrationStatusCardDto.recommendedCountryImageUrl})` }">

    </div>
    <div class="travelInfo" >
      <div class="nationInfo">
        <img :src="immigrationStatusCardDto.nation.flagImage">
        <div class="text">
          {{ immigrationStatusCardDto.nation.nationName }}
        </div>
      </div>
      <div class="pcrTest">
        <div>
          <v-icon size="15">
            fas fa-capsules
          </v-icon>
        </div>
        <div class="infoTitle">
          PCR 검사
        </div>
        <div class="infoText">
          {{immigrationStatusCardDto.pcrTest ? immigrationStatusCardDto.pcrTest : "없음" }}
        </div>
      </div>
      <div class="mandatoryQuarantine">
        <div>
          <v-icon color="#a7aab2" size="15">
            far fa-calendar-plus
          </v-icon>
        </div>
        <div class="infoTitle">
          의무격리기간
        </div>
        <div class="infoText">
          {{immigrationStatusCardDto.mandatoryQuarantineText ? immigrationStatusCardDto.mandatoryQuarantineText : "없음" }}
        </div>
      </div>
      <div class="canTravel" :class="{active: immigrationStatusCardDto.travelFlag}">
        {{ immigrationStatusCardDto.travelFlag ? "여행 가능": "여행 불가능" }}
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";

export default Vue.extend({
  props:{
    immigrationStatusCardDto: {
      type: Object as PropType<ImmigrationStatusSimpleResDto>,
      required: true
    }
  },
  methods:{
    tapCard(){
      this.$emit("tapCard",this.immigrationStatusCardDto)
    }
  }
})
</script>
<style scoped>
.bg{
  border-radius: 10px;
  border: solid 1px #e9ebf4;
  background-color: #fff;
  height: 173px;
  width: 100%;
  padding: 15px 20px 15px 15px;
  display: flex;
  justify-content: space-between;
}
.imgbg{
  flex: 1;
  border-radius: 10px;
  width: 114px;
  height: 143px;
  background-size: cover;
  background-position: center center;
}
.travelInfo{
  flex: 1.5;
  margin-left: 15px;
}
.nationInfo {
  display: flex;
  margin-top: 5px;
  align-items: center;
}
.nationInfo img{
  width: 26px;
  height: 15px;
  margin-right: 10px;
}
.nationInfo .text {
  font-family: Noto Sans KR;
  font-size: 15px;
  color: #242424;
}

.pcrTest, .mandatoryQuarantine {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.infoText{
  margin-left: auto;
  font-family: "Noto Sans KR";
  font-size: 13px;
  color: #242424;
}

.infoTitle{
  font-family: Noto Sans KR;
  font-size: 13px;
  color: #a7aab2;
  margin-left: 5px;
}

.canTravel{
  margin-top: 15px;
  width: 77px;
  height: 29px;
  border-radius: 15px;
  border: solid 1px #ef265c;
  color: #ef265c;
  background-color: #fff;
  font-family: Noto Sans KR;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.canTravel.active{
  border: solid 1px #215df0;
  color: #215df0;
  background-color: #fff;
}
</style>
