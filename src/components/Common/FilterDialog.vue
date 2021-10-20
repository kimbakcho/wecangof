<template>
  <v-bottom-sheet v-model=dialog width="90%">
    <div class="dialogRoot">
      <div class="contentRoot">
        <div class="title">
          국가 필터
        </div>
        <div class="continent">
          <div class="continentTitle">
            대륙
          </div>
          <div class="continentList">
            <div v-for="item in continents" :key="item.name" class="continentItem" :class="{ active: item.active }" @click="continentClick(item)">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="travel">
          <div class="travelTitle">
            여행자 입국
          </div>
          <div class="filterBtnRow">
            <div v-for="item in travelFilters" class="filterBtn" :key="item.name"  :class="{ active: item.active }" @click="travelBtnClick(item)">
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="visa">
          <div class="visaTitle">
            비자
          </div>
          <div class="filterBtnRow">
            <div v-for="item in visaFilters" class="filterBtn" :key="item.name"  :class="{ active: item.active }" @click="visaBtnClick(item)">
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="covidTest">
          <div class="covidTestTitle">
            코로나 검사
          </div>
          <div class="filterBtnRow">
            <div v-for="item in covidTestFilter" class="filterBtn" :key="item.name"  :class="{ active: item.active }" @click="covidTestBtnClick(item)">
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="benefitsVaccination">
          <div class="benefitsVaccinationTitle">
            백신 접종자 혜택 (다중선택 가능)
          </div>
          <div class="filterBtnRow">
            <div v-for="item in benefitsVaccination" class="filterBtn" :key="item.name"  :class="{ active: item.active }" @click="benefitsVaccinationBtnClick(item)">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="mandatoryQuarantine">
          <div class="mandatoryQuarantineTitle">
            의무 격리기간 (다중선택 가능)
          </div>
          <div class="mandatoryQuarantineList">
            <div v-for="item in mandatoryQuarantine" class="mandatoryQuarantineItem" :key="item.name"  :class="{ active: item.active }" @click="mandatoryQuarantineBtnClick(item)">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="actionBtn">
        <div @click="initFilter">
          초기화
        </div>
        <div @click="search">
          검색
        </div>
      </div>

    </div>
  </v-bottom-sheet>
</template>
<script lang="ts">
import Vue from "vue"
import {NationControlReqDto} from "@/Bis/NationControl/Dto/NationControlReqDto"

const FilterDialog = Vue.extend({
  data() {
    return {
      dialog: false,
      continents: [
        {
          name: "전체",
          active: false
        },
        {
          name: "북아메리카",
          active: false
        },
        {
          name: "남아메리카",
          active: false
        },{
          name: "아시아",
          active: false
        },{
          name: "중국",
          active: false
        },
        {
          name: "미국",
          active: false
        },
        {
          name: "유럽",
          active: false
        },
        {
          name: "오세아니아",
          active: false
        },
        {
          name: "아프리카",
          active: false
        }
      ],
      travelFilters:[
        {
          name: "가능",
          active: true,
        },
        {
          name: "불가능",
          active: false,
        },
      ],
      visaFilters:[
        {
          name: "필요",
          active: false,
        },
        {
          name: "불필요",
          active: true,
        },
      ],
      covidTestFilter:[
        {
          name: "필요",
          active: false,
        },
        {
          name: "불필요",
          active: true,
        },
      ],
      benefitsVaccination:[
        {
          name: "격리면제 및 단축",
          active: false,
        },
        {
          name: "코로나 검사 면제",
          active: false,
        },
      ],
      mandatoryQuarantine:[
        {
          name: "없음",
          active: false,
          between: [0,0]
        },
        {
          name: "즉시 검사후 음성결과까지 약24시간",
          active: false,
          between: [0,1]
        },
        {
          name: "6일 이내",
          active: false,
          between: [0,6]
        },
        {
          name: "1주~2주",
          active: false,
          between: [7,14]
        },
        {
          name: "2주 이상",
          active: false,
          between: [14,999]
        },
      ]
    }
  },
  methods: {
    open() {
      this.dialog = true
    },
    continentClick(item: any) {
      if(item.name == '전체' ){
        this.continents.forEach(x=>{
          x.active = false
        })
        item.active = true;
      }else {
        this.continents[0].active = false
        item.active = true;
      }

    },
    travelBtnClick(item: any){
      item.active = !item.active;

      let otherBtns = this.travelFilters.filter(x=>{
        return x.name != item.name;
      });
      otherBtns.forEach(x=>{
        x.active= false
      })
    },
    visaBtnClick(item: any){
      item.active = !item.active;

      let otherBtns = this.visaFilters.filter(x=>{
        return x.name != item.name;
      });
      otherBtns.forEach(x=>{
        x.active= false
      })
    },
    covidTestBtnClick(item: any){
      item.active = !item.active;

      let otherBtns = this.covidTestFilter.filter(x=>{
        return x.name != item.name;
      });
      otherBtns.forEach(x=>{
        x.active= false
      })
    },
    benefitsVaccinationBtnClick(item: any){
      item.active = !item.active;
    },
    mandatoryQuarantineBtnClick(item: any){
      item.active = !item.active;

    },
    initFilter(){
      this.continents.forEach(x=>{
        x.active = false;
      })

      this.travelFilters.forEach(x=>{
        x.active= false
      })
      this.travelFilters[0].active = true;

      this.covidTestFilter.forEach(x=>{
        x.active= false
      })
      this.covidTestFilter[1].active = true;

      this.benefitsVaccination.forEach(x=>{
        x.active = false
      })

      this.mandatoryQuarantine.forEach(x=>{
        x.active = false
      })
    },

    search(){
      let nationControlReqDto: NationControlReqDto = {}
      nationControlReqDto.continent = []
      nationControlReqDto.benefitsVaccination = []
      nationControlReqDto.mandatoryQuarantine = []
      this.continents.forEach(x=>{
        if(x.name != '전체'){
          if(x.active){
            nationControlReqDto.continent?.push(x.name)
          }
        }
      })
      if(!this.travelFilters[0].active && !this.travelFilters[1].active){
        nationControlReqDto.travelFlag = null;
      } else if(this.travelFilters[0].active){
        nationControlReqDto.travelFlag = true
      }else {
        nationControlReqDto.travelFlag = false
      }

      if(!this.visaFilters[0].active && !this.visaFilters[1].active){
        nationControlReqDto.visaFlag = null;
      } else if(this.visaFilters[0].active){
        nationControlReqDto.visaFlag = true
      }else {
        nationControlReqDto.visaFlag = false
      }

      if(!this.covidTestFilter[0].active && !this.covidTestFilter[1].active){
        nationControlReqDto.covidTest= null
      }else if(this.covidTestFilter[0].active){
        nationControlReqDto.covidTest= true
      }else {
        nationControlReqDto.covidTest = false
      }

      this.benefitsVaccination.forEach(x=>{
        if(x.active){
          nationControlReqDto.benefitsVaccination?.push(x.name);
        }
      })

      this.mandatoryQuarantine.forEach(x=>{
        if(x.active){
          nationControlReqDto.mandatoryQuarantine?.push(x.name);
        }
      })
      this.$emit("search",nationControlReqDto)
      this.dialog = false;
    }
  }
})
export type FilterDialogType = InstanceType<typeof FilterDialog>;
export default FilterDialog;
</script>
<style scoped>
.text {
  height: 300px;
  background-color: white;
}

.dialogRoot {

  padding: 21px 25px 0px;
  border-radius: 10px 10px 0px 0px;
  background-color: #fff;
}

.title {
  font-family: "Noto Sans KR";
  font-size: 18px;
  font-weight: bold;
  color: #242424;
}


.continentTitle {
  font-family: "Noto Sans KR";
  font-size: 13px;
  color: #242424;
  margin-bottom: 10px;
}
.continentList, .mandatoryQuarantineList{
  display: flex;
  flex-wrap: wrap;
}
.continentItem, .mandatoryQuarantineItem{
  padding: 10px 15px;
  border-radius: 5px;
  border: solid 1px #e9ebf4;
  font-family: "Noto Sans KR";
  font-size: 12px;
  color: #8c8f95;
  background-color: white;
  margin-bottom: 10px;
  margin-right: 5px;
}
.continentItem.active, .mandatoryQuarantineItem.active {
  background-color: #215df1;
  color: white;
  border: unset;
}

.travelTitle{
  font-family: "Noto Sans KR";
  font-size: 13px;
  color: #242424;
  margin-bottom: 10px;
}
.filterBtnRow {
  display: flex;
  justify-content: space-between;
}
.filterBtn{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  border-radius: 5px;
  border: solid 1px #e9ebf4;
  font-family: "Noto Sans KR";
  font-size: 12px;
  background-color: white;
  color: #8c8f95;
  width: 137px;
}
.filterBtn.active {
  background-color: #215df1;
  color: #fff;
  border: unset;
}
.visaTitle, .covidTestTitle, .benefitsVaccinationTitle, .mandatoryQuarantineTitle {
  font-family: "Noto Sans KR";
  font-size: 13px;
  color: #242424;
  margin: 10px 0px;
}
.actionBtn{
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actionBtn div:nth-child(1){
  width: 123px;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 19px 0 0;
  border-radius: 38px;
  border: solid 1px #242424;
  font-family: "Noto Sans KR";
  font-size: 12px;
  color: #242424;
}
.actionBtn div:nth-child(2){
  width: 123px;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 19px;
  border-radius: 38px;
  background-color: #242424;
  font-family: "Noto Sans KR";
  font-size: 12px;
  color: #fff;
}

.contentRoot {
  max-height: calc(90vh - 150px);
  overflow-y: auto;
}

.contentRoot::-webkit-scrollbar {
  display: none;
}
</style>
