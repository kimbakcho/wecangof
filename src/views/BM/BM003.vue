<template>
  <div class="root">
    <top-bar title="국가별 출입국 현황">
      <template v-slot:endSlot>
        <div @click="searchNation">
          <v-icon size="15" color="#323232">
            wc-search
          </v-icon>
        </div>
      </template>
    </top-bar>
    <div class="divider"></div>
    <div class="filterBar">
      <div class="filterBtn" :class="{active :isTravelFilter}" @click="travelTrueClick">
        여행 가능
      </div>
      <div class="filterBtn" :class="{active :isMandatoryQuarantine}" @click="mandatoryQuarantineClick">
        격리 없음
      </div>
      <div class="detailFilter" :class="{active :isDetailFilter}" @click="detailFilterClick">
        <v-icon size="15">
          wc-filter-1
        </v-icon>
      </div>
    </div>
    <div class="count">
      총 {{ nationControlList.length }} 개국
    </div>
    <div class="nationList">
      <country-button v-for="(item,index) in nationControlList" :key="index" :nation-control="item" class="nationItem" @tapNation="goToNationInfo">

      </country-button>
    </div>
    <FilterDialog ref="filterDialog" @search="detailFilterSearch">

    </FilterDialog>
  </div>
</template>
<script lang="ts">
import Vue, {VueConstructor} from "vue"
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import NationControlUseCase from "@/Bis/NationControl/Domain/UseCase/NationControlUseCase";
import CountryButton from "@/components/Common/CountryButton.vue";
import FilterDialog, {FilterDialogType} from "@/components/Common/FilterDialog.vue";
import {NationControlReqDto} from "@/Bis/NationControl/Dto/NationControlReqDto";
import TopBar from "@/components/Common/TopBar.vue";

export default (Vue as VueConstructor<Vue & {
  $refs: {
    filterDialog: FilterDialogType
  }
}>).extend({
  components: {
    CountryButton, FilterDialog, TopBar
  },
  data() {
    return {
      nationControlList: [] as NationControlResDto[],
      isTravelFilter: true,
      isMandatoryQuarantine: false,
      isDetailFilter: false,
      nationControlUseCase: new NationControlUseCase(),

    }
  },
  mounted() {
    this.travelTrueClick();

  },
  methods: {
    back() {
      this.$router.back();
    },
    async travelTrueClick() {
      this.isTravelFilter = true;
      this.isMandatoryQuarantine = false;
      this.isDetailFilter = false;
      this.nationControlList = await this.nationControlUseCase.getFilter({
        travelFlag: true
      });
    },
    async mandatoryQuarantineClick() {
      this.isTravelFilter = false;
      this.isMandatoryQuarantine = true;
      this.isDetailFilter = false;

      this.nationControlList = await this.nationControlUseCase.getFilter({
        mandatoryQuarantine: ["없음"]
      });


    },
    detailFilterClick() {
      this.$refs.filterDialog.open();
    },
    async detailFilterSearch(filter: NationControlReqDto) {
      console.log("detailFilterSearch")
      this.isTravelFilter = false;
      this.isMandatoryQuarantine = false;
      this.isDetailFilter = true;
      this.$forceUpdate()
      this.nationControlList = await this.nationControlUseCase.getFilter(filter);

    },
    goToNationInfo(infoItem: NationControlResDto) {
      this.$router.push({
        path: `/BM004/${infoItem.id}`
      })
    },
    searchNation(){
      this.$router.push({
        path:"/BM0031"
      })
    }
  }
})
</script>
<style scoped>
.root {
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: white;
  z-index: 10;
}



.divider {
  height: 1px;
  background-color: #e9ebf4;
}

.filterBar {
  height: 40px;
  padding: 0px 25px;
  margin-top: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filterBtn {
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  font-family: "Noto Sans KR";
  font-size: 16px;
  font-weight: 500;
  color: #545454;
  background-color: white;
  border: solid 1px #e6e6e6;
}

.filterBtn.active {
  color: white;
  border: unset;
  background-color: #215df1;
}

.count {
  font-family: "Noto Sans KR";
  font-size: 16px;
  margin-left: 25px;
  margin-top: 17px;
}

.nationList {
  display: flex;
  flex-wrap: wrap;

  align-items: center;
  padding: 25px;
}

.nationItem {
  margin-bottom: 25px;
}
.detailFilter{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
}
.detailFilter i{
  color: #15171C;
}

.detailFilter.active {
  background-color: #2661F1;
  border-radius: 50%;

}
.detailFilter.active i{
  color: white;
}
</style>
