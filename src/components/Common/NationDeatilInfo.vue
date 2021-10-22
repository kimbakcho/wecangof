<template>
  <div>
    <div class="topTabBar">
      <div class="exitBtn" :class="{ active: isExit }" @click="exitModeClick">
        🛫
        <div class="text">
          출국하기
        </div>

      </div>
      <div class="returnHomeBtn" :class="{ active: isReturnHome }" @click="returnHomeModeClick">
        🛬
        <div class="text">
          귀국하기
        </div>
      </div>
    </div>
    <div class="contentBody">
      <div v-show="isExit">
        <v-tabs fixed-tabs v-model="exitTab" background-color="white" color="#15171c" slider-color="#215df1" slider-size="5">
          <v-tab :transition="true" :reverse-transition="true"
                 :ripple="false">
            <div class="tabText">
              백신 접종자
            </div>
          </v-tab>
          <v-tab :transition="true" :reverse-transition="true"
                 :ripple="false">
            <div class="tabText">
              미 접종자
            </div>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="exitTab" >
          <v-tab-item eager>
            <div class="updateTime">
              {{ `최신 업데이트 ${getUpdateDateFormatText(immigrationStatusDetailResDto.vaccinatedLeavesCountry.updateDateTime)}` }}
            </div>
            <div id="exitVaccinated" class="contentViewer">

            </div>
          </v-tab-item>
          <v-tab-item eager>
            <div class="updateTime">
              {{ `최신 업데이트 ${getUpdateDateFormatText(immigrationStatusDetailResDto.unvaccinatedLeavesCountry.updateDateTime)}` }}
            </div>
            <div id="exitNotVaccinated" class="contentViewer">

            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <div v-show="isReturnHome">
        <v-tabs fixed-tabs v-model="returnHome" background-color="white" color="#15171c" slider-color="#215df1" slider-size="5">
          <v-tab :transition="true" :reverse-transition="true"
                 :ripple="false">
            <div class="tabText">
              백신 접종자
            </div>
          </v-tab>
          <v-tab :transition="true" :reverse-transition="true"
                 :ripple="false">
            <div class="tabText">
              미 접종자
            </div>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="returnHome" >
          <v-tab-item eager >
            <div class="updateTime">
              {{ `최신 업데이트 ${ getUpdateDateFormatText(immigrationStatusDetailResDto.vaccinatedReturnHome.updateDateTime)}` }}
            </div>
            <div id="returnHomeVaccinated" class="contentViewer">

            </div>
          </v-tab-item>
          <v-tab-item eager >
            <div class="updateTime">
              {{ `최신 업데이트 ${getUpdateDateFormatText(immigrationStatusDetailResDto.unvaccinatedReturnHome.updateDateTime)}` }}
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
import {DateTime} from "luxon";

import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

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
    getUpdateDateFormatText(dateStr: string){
      return DateTime.fromISO(dateStr).toFormat("yyyy-MM-dd")

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
.exitBtn img{
  width: 16px;
  height: 16px;
}
.returnHomeBtn img{
  width: 16px;
  height: 16px;
}
.exitBtn, .returnHomeBtn{

  box-shadow: inset 0 -2px 1px rgba(0, 0 ,0, 0.13);

}
.exitBtn.active {
  border-radius: 0px 10px 0px 0px;
  box-shadow: 0 -7px 1px 0 rgba(0, 0, 0 , 0.02)

}

.returnHomeBtn.active {
  border-radius: 10px 0px 0px 0px;
  box-shadow: 0 -7px 1px 0 rgba(0, 0, 0 , 0.02)
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
  font-family: "Noto Sans KR";
  font-size: 12px;
  color: #a7aab2;
  margin: 15px 25px;
}
.contentViewer{
  padding: 0px 25px 15px;
}

</style>
<style>
@media (min-width: 320px) {
  .contentViewer img {
    width: calc(100vw - 50px);
  }
}

.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before {
  opacity: 0 !important
}

.theme--light.v-tabs .v-tab:hover::before {
  opactiy: 0 !important;
  transition: none !important;
}

.v-tab:before {
  color: white !important;
}

</style>
