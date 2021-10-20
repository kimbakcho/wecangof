<template>
  <div>
    <v-dialog v-model="dialog" fullscreen hide-overlay
              transition="dialog-bottom-transition">
      <div class="QA002Root">
        <div class="topBar">
          <img src="@/assets/back_button.png"
               class="back_button" @click="closeDialog" >
          <div class="topTitle">
            Q&A
          </div>
          <div class="search" @click="filterSearch">
            <v-icon size="15">
              fas fa-search
            </v-icon>
          </div>
        </div>
        <div>
          <v-tabs
              grow
              background-color="#e9ebf4"
              v-model="tabIndex"
              color="#464646"
              slider-color="#4778ff"
              slider-size="5"
          >
            <v-tab >
              검색어로 찾기
            </v-tab>
            <v-tab>
              국가로 찾기
            </v-tab>
          </v-tabs>
        </div>
        <div class="QA002Content">
          <v-tabs-items v-model="tabIndex">
            <v-tab-item class="searchText">
              <div class="radioGroup">
                <v-radio-group v-model="textSearchMode" row hide-details>
                  <v-radio
                      label="제목 및 내용"
                      value="titleOrContent"
                      color="#8c8f95"
                      :ripple="false"
                  ></v-radio>
                  <v-radio
                      label="작성자"
                      value="writer"
                      color="#8c8f95"
                      :ripple="false"
                  ></v-radio>
                </v-radio-group>

              </div>
              <div class="textFiled">
                <v-text-field outlined append-icon="fas fa-search" filled background-color="white" placeholder="검색어 입력해주세요" v-model="searchText">

                </v-text-field>
              </div>

            </v-tab-item>
            <v-tab-item class="nationSearch" >
                <scroll-picker :options="nationOptions" v-model="selectId" v-if="loaded">
                </scroll-picker>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>

    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import "vue-scroll-picker/dist/style.css"
import { ScrollPicker } from "vue-scroll-picker"
import NationControlUseCase from "@/Bis/NationControl/Domain/UseCase/NationControlUseCase";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import {FilterSearch} from "@/views/QA/Dto/FilterSearch";

const QA002 = Vue.extend({
  data(){
    return {
      dialog: false,
      tabIndex: 0,
      textSearchMode: "titleOrContent",
      searchText: "",
      selectId: 9,
      loaded: false,
      nationOptions: [] as any[]
    }
  },
  components:{
    ScrollPicker
  },
  methods:{
    closeDialog(){
      this.dialog = false;
    },
    async open(){
      this.loaded = false;
      let nationControlUseCase = new NationControlUseCase();
      let nationControlResDtos = await nationControlUseCase.getFilter({});
      this.nationOptions = nationControlResDtos.map(x=>{
        return {
          name: x.nationName,
          value: x.id
        }
      });
      this.loaded = true;
      this.dialog = true


    },
    filterSearch(){
      let filterSearch = {} as FilterSearch;
      if(this.tabIndex == 0){
        filterSearch.searchMode = this.textSearchMode
        filterSearch.text = this.searchText
      }else if(this.tabIndex == 1){
        filterSearch.searchMode = "nation"
        filterSearch.nationId = this.selectId
      }
      this.$emit("filterSearch",filterSearch)
      this.dialog = false
    }
  }
})
export type QA002Type = InstanceType<typeof QA002>;
export default QA002;
</script>
<style scoped>
.QA002Root{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.topBar .search {
  margin-right: 25px;
}

.topBar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 63px;
  background-color: #e9ebf4;
}

.topBar img {
  width: 19px;
  height: 15px;
  margin-left: 25px;
}

.topBar .topTitle{
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.QA002Content{
  flex-grow: 1;
  background-color:  #f4f5fc;
}
.searchText{
  background-color:  #f4f5fc;
}
.radioGroup{
  margin-left: 25px;
}

.searchText .textFiled {
  margin: 15px 25px;
}
.nationSearch {
  width: 100%;
  height: 100%;
  background-color:  #f4f5fc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nationScoller{
  width: 100%;
  height: 100%;
}
</style>
<style>
.QA002Root .v-tabs-slider-wrapper{
  display: flex;
  justify-content: center;
}
.QA002Root .v-tabs-slider{
  width: 120px !important;
}

.QA002Root .v-input--selection-controls__input .v-icon {
  font-size: 12px
}
.QA002Root .v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label {
  font-size: 12px;
}
.QA002Root .v-input--selection-controls__input{
  margin-right: 0px !important;
}

.QA002Root .QA002Content .searchText .textFiled fieldset{
  border: solid 1px #e9ebf4;
}
.QA002Root .QA002Content .searchText .textFiled i {
  font-size: 18px;
}
.QA002Root .QA002Content .searchText .textFiled input {
  font-family: 'Noto Sans KR' !important;
}
.QA002Root .v-tabs--grow > .v-tabs-bar .v-tab{
  font-family: "Noto Sans KR";
  font-size: 16px;
  font-weight: 500;
}
.QA002Content .v-tabs-items{
  height: 100%;
  background-color:  #f4f5fc !important;
}

.QA002Content .vue-scroll-picker-layer .top{
  background: linear-gradient(180deg,#f4f5fc 20%, rgba(255,255,255,0.7));
}
.QA002Content .vue-scroll-picker-layer .bottom{
  background: linear-gradient(0deg,#f4f5fc 20%, rgba(255,255,255,0.7));
}
</style>
