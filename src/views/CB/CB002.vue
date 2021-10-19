<template>
  <div class="CB002Root">
    <div class="CB002Title">
      <h3>
        현황 수정
      </h3>
      <div>
        <v-btn @click="update" :loading="updateing">
          저장
        </v-btn>
      </div>
    </div>

    <div class="nationName">
      <div>
        국가명
      </div>
      <div class="ml-4">
        {{ igsd.nation.nationName }}
      </div>
    </div>
    <div class="flagImage">
      <div>
        국가이미지
      </div>
      <v-file-input accept="image/*" label="국기 이미지" v-model="flagImage">

      </v-file-input>
    </div>
    <div class="recommend">
      <div>
        추천 국가
      </div>
      <v-select
          :items="recommendItems"
          label="추천 국가"
          v-model="igsd.recommendedCountry"
      ></v-select>

      <v-text-field type="number" label="우선 순위" multiple v-model="igsd.recommendedCountryOrder">

      </v-text-field>

      <v-file-input accept="image/*" label="대표 이미지" multiple v-model="recommendedCountryImage">

      </v-file-input>

    </div>
    <div class="continent">
      <div>
        대륙
      </div>
      <v-select :items="continent" clearable v-model="igsd.continent">

      </v-select>
    </div>
    <div class="travelFlag">
      <div>
        여행 가능 여부
      </div>
      <v-select :items="travelFlagItems" clearable v-model="igsd.travelFlag">

      </v-select>
    </div>

    <div class="visaFlag">
      <div>
        비자 필요 여부
      </div>
      <v-select :items="visaFlagItems" clearable  v-model="igsd.visaFlag">

      </v-select>
    </div>

    <div class="covidTest">
      <div>
        코로나 검사
      </div>
      <v-select :items="covidTestItems" clearable v-model="igsd.covidTest">

      </v-select>
    </div>
    <div class="benefitsVaccination">
      <div>
        백신 접종자 헤택
      </div>
      <v-select :items="benefitsVaccinationItems" clearable v-model="igsd.benefitsVaccination">

      </v-select>
    </div>

    <div class="mandatoryQuarantine">
      <div>
        의무 격리 기간
      </div>
      <v-select :items="mandatoryQuarantineItems" clearable v-model="igsd.mandatoryQuarantine"> </v-select>
    </div>

    <div class="possibleExempted">
      <div>
        면제 가능 여부
      </div>
      <v-select :items="possibleExemptedItems" v-model="igsd.possibleExempted">

      </v-select>
    </div>

    <div class="detail">
      <h3>
        상세 보기
      </h3>
      <div class="vaccinationFlag">
        <div>
          백신 접종
        </div>
        <v-select :items="vaccinationFlag" v-model="igsd.vaccinationFlag">

        </v-select>
      </div>
      <div class="pcrTest">
        <v-text-field label="PCR 검사" v-model="igsd.pcrTest">

        </v-text-field>
      </div>
      <div class="mandatoryQuarantineText">
        <v-text-field label="의무격리" v-model="igsd.mandatoryQuarantineText">

        </v-text-field>
      </div>
    </div>

    <div class="detailContent">
      <v-tabs v-model="contentInfoTab">
        <v-tab>백신 접종자 출국</v-tab>
        <v-tab>백신 접종자 귀국</v-tab>
        <v-tab>미접종자 출국</v-tab>
        <v-tab>미접종자 귀국</v-tab>
      </v-tabs>
      <v-tabs-items v-model="contentInfoTab">
        <v-tab-item eager>
          <NationInfoEditor ref="vaccinatedLeavesCountry" :immigration-info-management-id="igsd.vaccinatedLeavesCountry.id"> </NationInfoEditor>
        </v-tab-item>
        <v-tab-item eager>
          <NationInfoEditor ref="vaccinatedReturnHome"  :immigration-info-management-id="igsd.vaccinatedReturnHome.id"> </NationInfoEditor>
        </v-tab-item>
        <v-tab-item eager>
          <NationInfoEditor ref="unvaccinatedLeavesCountry"  :immigration-info-management-id="igsd.unvaccinatedLeavesCountry.id"> </NationInfoEditor>
        </v-tab-item>
        <v-tab-item eager>
          <NationInfoEditor ref="unvaccinatedReturnHome"   :immigration-info-management-id="igsd.unvaccinatedReturnHome.id"> </NationInfoEditor>
        </v-tab-item>
      </v-tabs-items>
    </div>



  </div>
</template>
<script lang="ts">
import Vue, {PropType, VueConstructor} from "vue"
import {Route} from "vue-router";
import {ImmigrationStatusDetailResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusDetailResDto";
import ImmigrationStatusUseCase from "@/Bis/ImmigrationStatus/Domain/UseCase/ImmigrationStatusUseCase";
import NationInfoEditor, {NationInfoEditorType} from "@/components/CB/NationInfoEditor.vue";
import ImmigrationStatusUpdateReqDto from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusUpdateReqDto";
import FileUploadService from "@/Bis/Common/FileUploadService";


export default (Vue as VueConstructor<Vue & {
  $refs:{
    vaccinatedLeavesCountry: NationInfoEditorType,
    vaccinatedReturnHome: NationInfoEditorType,
    unvaccinatedLeavesCountry: NationInfoEditorType,
    unvaccinatedReturnHome: NationInfoEditorType,
  }
}>).extend({
  components:{
    NationInfoEditor
  },

  props: {
    nationId: {
      type: String,
      required: true
    },
    immigrationStatusDetail: {
      type: Object as PropType<ImmigrationStatusDetailResDto>,
      required: true
    }
  },
  data() {
    return {
      updateing: false,
      contentInfoTab: 0,
      flagImage: null as File[] | null,
      flagImageUrl: "",
      recommendedCountryImage: null as File[] | null ,
      recommendedCountryImageUrl: "",

      recommendItems: [
        {
          value: false,
          text: "해제"
        },
        {
          value: true,
          text: "등록"
        },
      ],
      continent:[
        "남아메리카","북아메리카","유럽","아시아","아프리카","오세아니아","중국","미국"
      ],
      travelFlagItems: [
        {
          value: false,
          text: "불가능"
        },
        {
          value: true,
          text: "가능"
        },
      ],
      visaFlagItems: [
        {
          value: false,
          text: "불필요"
        },
        {
          value: true,
          text: "필요"
        },
      ],
      covidTestItems:[
        {
          value: false,
          text: "불필요"
        },
        {
          value: true,
          text: "필요"
        },
      ],
      benefitsVaccinationItems:[
        "격리면제 및 단축","코로나 검사 면제"
      ],
      mandatoryQuarantineItems: [
          "없음","즉시 검사 후 음성 결과까지 약 24시간","6일 이내","1주~2주","2주 이상"
      ],
      possibleExemptedItems: [
        {
          value: false,
          text: "불가능"
        },
        {
          value: true,
          text: "가능"
        },
      ],
      vaccinationFlag: [
        {
          value: 0,
          text: "무관"
        },
        {
          value: 1,
          text: "선택"
        },
        {
          value: 2,
          text: "필수"
        }
      ]
    }
  },
  computed: {
    igsd(): ImmigrationStatusDetailResDto {
      return this.immigrationStatusDetail
    }
  },
  mounted() {
    if(this.igsd.nation.flagImage){
      this.flagImage = [new File([],this.igsd.nation.fileName)]
      this.flagImageUrl = this.igsd.nation.flagImage;
    }

    if(this.igsd.recommendedCountryImageUrl){
      this.recommendedCountryImage = [new File([],this.igsd.recommendedCountryImageFileName)]
      this.recommendedCountryImageUrl = this.igsd.recommendedCountryImageUrl
    }
  },
  methods:{
    async update(){
      this.updateing = true
      let immigrationStatusUpdateReqDto = new ImmigrationStatusUpdateReqDto();
      Object.assign<ImmigrationStatusUpdateReqDto,ImmigrationStatusDetailResDto>(immigrationStatusUpdateReqDto,this.igsd)
      let fileUploadService = new FileUploadService();

      if(this.flagImage && this.flagImage.length>0 && this.flagImage[0].size > 0){
        let flagResDto = await fileUploadService.upload(this,this.flagImage[0]);

        if(flagResDto){
          immigrationStatusUpdateReqDto.nationFlagImageUrl = flagResDto?.imageUrl;
        }
        immigrationStatusUpdateReqDto.nationFlagImageFileName = this.flagImage[0].name
      }

      if(this.recommendedCountryImage && this.recommendedCountryImage.length>0 && this.recommendedCountryImage[0].size > 0){
        console.log("recommendedCountryImage");
        console.log(this.recommendedCountryImage);
        let recommendedCountryImageResDto = await fileUploadService.upload(this,this.recommendedCountryImage[0]);
        immigrationStatusUpdateReqDto.recommendedCountryImageUrl = recommendedCountryImageResDto?.imageUrl;
        immigrationStatusUpdateReqDto.recommendedCountryImageFileName = this.recommendedCountryImage[0].name
      }
      let immigrationStatusUseCase = new ImmigrationStatusUseCase();
      await immigrationStatusUseCase.update(immigrationStatusUpdateReqDto)
      await this.$refs.vaccinatedLeavesCountry.update();
      await this.$refs.vaccinatedReturnHome.update();
      await this.$refs.unvaccinatedLeavesCountry.update();
      await this.$refs.unvaccinatedReturnHome.update();

      this.updateing = false;

    }
  },
  async beforeRouteEnter(to: Route, from: Route, next: any) {
    let immigrationStatusUseCase = new ImmigrationStatusUseCase();
    let params: any = to.params;
    params.immigrationStatusDetail = await immigrationStatusUseCase.getNationInfo(Number(to.params.nationId))
    next();
  }

})
</script>
<style scoped>

.CB002Root {
  padding: 24px;
}

.CB002Title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nationName, .flagImage, .recommend, .continent, .travelFlag,
.covidTest, .visaFlag, .mandatoryQuarantine, .benefitsVaccination,
.possibleExempted, .vaccinationFlag{
  margin-top: 14px;
  display: flex;
  align-items: center;
}

.nationName div:nth-child(1) {
  font-weight: bold;
}

.flagImage div:nth-child(1) {
  font-weight: bold;
}

.flagImage div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}

.recommend div:nth-child(1) {
  font-weight: bold;
}
.recommend div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}
.recommend div:nth-child(3) {
  margin-left: 15px;
  max-width: 200px;
}
.recommend div:nth-child(4) {
  margin-left: 15px;
  max-width: 200px;
}

.continent div:nth-child(1) {
  font-weight: bold;
}
.continent div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}

.travelFlag div:nth-child(1) {
  font-weight: bold;
}
.travelFlag div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}

.visaFlag div:nth-child(1) {
  font-weight: bold;
}
.visaFlag div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}

.covidTest div:nth-child(1) {
  font-weight: bold;
}
.covidTest div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}

.benefitsVaccination div:nth-child(1) {
  font-weight: bold;
}
.benefitsVaccination div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}


.mandatoryQuarantine div:nth-child(1) {
  font-weight: bold;
}
.mandatoryQuarantine div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}

.possibleExempted div:nth-child(1) {
  font-weight: bold;
}
.possibleExempted div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}

.detail{
  border: solid 1px gray;
  padding: 24px;
}

.vaccinationFlag div:nth-child(1) {
  font-weight: bold;
}
.vaccinationFlag div:nth-child(2) {
  margin-left: 15px;
  max-width: 200px;
}

.detailContent{
  min-height: 500px;
}
</style>
