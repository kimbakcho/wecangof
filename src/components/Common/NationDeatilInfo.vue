<template>
  <div>
    <div class="contentBody">
      <div>
        <v-tabs fixed-tabs v-model="tabIdx" background-color="white" color="#15171c" slider-color="#215df1" slider-size="5">
          <v-tab :transition="true" :reverse-transition="true"
                 :ripple="false">
            <div class="tabText">
              출국
            </div>
          </v-tab>
          <v-tab :transition="true" :reverse-transition="true"
                 :ripple="false">
            <div class="tabText">
              귀국
            </div>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabIdx" >
          <v-tab-item eager>

            <div id="exitVaccinated" class="contentViewer" ref="exitVaccinated">

            </div>
            <div class="publicAnnouncement">
              {{ immigrationStatusDetailResDto.publicAnnouncement }}
            </div>
            <div class="updateTime">
              {{ `최신 업데이트 ${getUpdateDateFormatText(immigrationStatusDetailResDto.vaccinatedLeavesCountry.updateDateTime)}` }}
            </div>
          </v-tab-item>
          <v-tab-item eager>

            <div id="returnHomeVaccinated" class="contentViewer" ref="returnHomeVaccinated">

            </div>
            <div class="publicAnnouncement">
              {{ immigrationStatusDetailResDto.publicAnnouncement }}
            </div>
            <div class="updateTime">
              {{ `최신 업데이트 ${getUpdateDateFormatText(immigrationStatusDetailResDto.unvaccinatedLeavesCountry.updateDateTime)}` }}
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType, VueConstructor} from "vue"
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

export default (Vue as VueConstructor<Vue & {
  $refs:{
    exitVaccinated: HTMLDivElement,
    returnHomeVaccinated: HTMLDivElement,
  }
}>).extend({
  props:{
    immigrationStatusDetailResDto:{
      type: Object as PropType<ImmigrationStatusDetailResDto>,
      required: true
    }
  },
  data(){
    return {
      tabIdx: 0,
    }
  },
  mounted(){
    let pluginOption = {
      context: this
    }

    const vaccinatedLeavesCountryViewer = new Viewer({
      el: this.$refs.exitVaccinated,
      plugins: [[popupPlugin,pluginOption],[innerLinkPlugin,pluginOption]],
      initialValue: this.immigrationStatusDetailResDto.vaccinatedLeavesCountry.contentMarkDown,
    });


    const vaccinatedReturnHomeViewer = new Viewer({
      el: this.$refs.returnHomeVaccinated,
      plugins: [[popupPlugin,pluginOption],[innerLinkPlugin,pluginOption]],
      initialValue: this.immigrationStatusDetailResDto.vaccinatedReturnHome.contentMarkDown,
    });
    this.$forceUpdate()
  },
  methods:{

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
  box-shadow: inset 0 -3px 6px rgba(0, 0 ,0, 0.13);
  background-color: #e6e6e6;
}
.exitBtn.active {
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.13);
  background-color: white;
}

.returnHomeBtn.active {
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.13);
  background-color: white;
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
.updateTime, .publicAnnouncement{
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
