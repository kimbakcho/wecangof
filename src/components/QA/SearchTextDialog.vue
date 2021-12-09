<template>
  <v-dialog v-model="dialog"  fullscreen hide-overlay transition="dialog-bottom-transition">
    <div class="searchTextDialog">
      <div class="topBar">
        <img src="@/assets/back_button.png"
             class="back_button" @click="closeDialog">
        <div class="topTitle">
          검색어로 찾기
        </div>
      </div>
      <div class="content">
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

        <div class="searchTextFiled">
          <v-text-field outlined append-icon="fas fa-search" filled background-color="white" placeholder="검색어 입력해주세요" v-model="searchText">

          </v-text-field>
        </div>
      </div>


      <div class="bottomActions" @click="onSearchText">
        확인
      </div>

    </div>


  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue"
import {SearchTextReqDto} from "@/components/QA/Dto/SearchTextReqDto";

const SearchTextDialog = Vue.extend({
  data(){
    return {
      dialog: false,
      textSearchMode: "titleOrContent",
      searchText: "",
    }
  },
  methods:{
    open(){
      this.dialog = true;
    },
    closeDialog(){
      this.dialog = false;
    },
    onSearchText(){
      this.$emit("searchText",{ searchText: this.searchText, textSearchMode: this.textSearchMode } as SearchTextReqDto)
      this.dialog = false;
    }
  }
})

export default SearchTextDialog;
export type SearchTextDialogType = InstanceType<typeof SearchTextDialog>;
</script>
<style scoped>
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

.topBar .topTitle {
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.searchTextDialog{
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
}
.content {
  background-color: #f4f5fc;
  flex-grow: 1;
}

.radioGroup{
  margin-left: 25px;
}

.searchTextFiled {
  margin: 15px 25px;
}
.bottomActions {
  width: 100%;
  height: 56px;
  background-color: #2661f1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
