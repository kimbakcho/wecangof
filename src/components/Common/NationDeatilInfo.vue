<template>
  <div>
    <div class="topTabBar">
      <div class="exitBtn" :class="{ active: isExit }" @click="exitModeClick">
        <div >
          <v-icon size="15">
            fas fa-fighter-jet
          </v-icon>
        </div>
        <div class="text">
          출국하기
        </div>

      </div>
      <div class="returnHomeBtn" :class="{ active: isReturnHome }" @click="returnHomeModeClick">
        <div>
          <v-icon size="15">
            fas fa-fighter-jet
          </v-icon>
        </div>
        <div class="text">
          귀국하기
        </div>
      </div>
    </div>
    <div class="contentBody">
      <div v-show="isExit">
        <v-tabs fixed-tabs v-model="exitTab" background-color="white" color="#15171c" slider-color="#215df1" slider-size="5">
          <v-tab>
            <div class="tabText">
              백신 접종자
            </div>
          </v-tab>
          <v-tab>
            <div class="tabText">
              미 접종자
            </div>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="exitTab" >
          <v-tab-item eager>
            <div class="updateTime">
              {{ `최신 업데이트 ${immigrationStatusDetailResDto.vaccinatedLeavesCountry.updateDateTime}` }}
            </div>
            <div id="exitVaccinated" class="contentViewer">

            </div>
          </v-tab-item>
          <v-tab-item eager>
            <div class="updateTime">
              {{ `최신 업데이트 ${immigrationStatusDetailResDto.unvaccinatedLeavesCountry.updateDateTime}` }}
            </div>
            <div id="exitNotVaccinated" class="contentViewer">

            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <div v-show="isReturnHome">
        <v-tabs fixed-tabs v-model="returnHome" background-color="white" color="#15171c" slider-color="#215df1" slider-size="5">
          <v-tab>
            <div class="tabText">
              백신 접종자
            </div>
          </v-tab>
          <v-tab>
            <div class="tabText">
              미 접종자
            </div>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="returnHome" >
          <v-tab-item eager >
            <div class="updateTime">
              {{ `최신 업데이트 ${immigrationStatusDetailResDto.vaccinatedReturnHome.updateDateTime}` }}
            </div>
            <div id="returnHomeVaccinated" class="contentViewer">

            </div>
          </v-tab-item>
          <v-tab-item eager >
            <div class="updateTime">
              {{ `최신 업데이트 ${immigrationStatusDetailResDto.unvaccinatedReturnHome.updateDateTime}` }}
            </div>
            <div id="returnHomeNotVaccinated" class="contentViewer">

            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {ImmigrationStatusDetailResDto} from "../../Bis/ImmigrationStatus/Dto/ImmigrationStatusDetailResDto";
import {popupPlugin} from "@/toustuiplugin/popupPlugin";
import {innerLinkPlugin} from "@/toustuiplugin/innerLinkPlugin";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

// import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
// import  tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

export default Vue.extend({
  props:{
    immigrationStatusDetailResDto:{
      type: Object as PropType<ImmigrationStatusDetailResDto>,
      required: true
    }
  },
  data(){
    return {
      isExit: true,
      isReturnHome: false,
      exitTab: 0,
      returnHome: 0
    }
  },
  mounted(){
    let pluginOption = {
      context: this
    }

    const vaccinatedLeavesCountryViewer = new Viewer({
      el: document.querySelector('#exitVaccinated') as any,
      plugins: [[popupPlugin,pluginOption],[innerLinkPlugin,pluginOption]],
      initialValue: this.immigrationStatusDetailResDto.vaccinatedLeavesCountry.contentMarkDown,
    });
    const unVaccinatedLeavesCountryViewer = new Viewer({
      el: document.querySelector('#exitNotVaccinated') as any,
      plugins: [[popupPlugin,pluginOption],[innerLinkPlugin,pluginOption]],
      initialValue: this.immigrationStatusDetailResDto.unvaccinatedLeavesCountry.contentMarkDown,
    });

    const vaccinatedReturnHomeViewer = new Viewer({
      el: document.querySelector('#returnHomeVaccinated') as any,
      plugins: [[popupPlugin,pluginOption],[innerLinkPlugin,pluginOption]],
      initialValue: this.immigrationStatusDetailResDto.vaccinatedReturnHome.contentMarkDown,
    });

    const unvaccinatedReturnHomeViewer = new Viewer({
      el: document.querySelector('#returnHomeNotVaccinated') as any,
      plugins: [[popupPlugin,pluginOption],[innerLinkPlugin,pluginOption]],
      initialValue: this.immigrationStatusDetailResDto.unvaccinatedReturnHome.contentMarkDown,
    });
  },
  methods:{
    exitModeClick(){
      this.isExit = true;
      this.isReturnHome = false;
    },
    returnHomeModeClick(){
      this.isExit = false;
      this.isReturnHome = true;
    },

  }

})
</script>
<style scoped>
.topTabBar{
  display: flex;
  height: 36px;
}
.topTabBar .exitBtn,.topTabBar .returnHomeBtn{
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.exitBtn, .returnHomeBtn{
  box-shadow: inset 0 -4px 2px rgba(0, 0, 0, 0.13);

}
.exitBtn.active {
  border-radius: 0px 10px 0px 0px;
  box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.13);

}

.returnHomeBtn.active {
  border-radius: 10px 0px 0px 0px;
  box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.13);
}

.topTabBar .text {
  margin-left: 5px;
  font-family: Noto Sans KR;
  font-size: 16px;
  color: #15171c;
}
.contentBody{
  background-color: white;
  padding-top: 25px;
}
.tabText{
  font-family: Noto Sans KR;
  font-size: 12px;
  color: #15171c;
}
.updateTime{
  display: flex;
  justify-content: right;
  font-family: NotoSansKR;
  font-size: 12px;
  color: #a7aab2;
  margin: 15px 25px;
}
.contentViewer{
  padding: 0px 25px 15px;
}
</style>
