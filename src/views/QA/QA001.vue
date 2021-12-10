<template>
  <div class="CommunityHomeRoot">
    <div class="top">
      <div class="actions">
        <div @click="drawer = true">
          <v-icon color="white">
            fas fa-bars
          </v-icon>
        </div>
        <div class="search" @click="searchTextPage">
          <v-icon size="18" color="white">
            fas fa-search
          </v-icon>
        </div>
      </div>
      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
          color="#2661f1"
      >
        <div class="Drawer">

          <div class="Home" @click="goToHome">
            <v-icon color="white">
              fas fa-home
            </v-icon>
          </div>
          <div class="categoryRoot">
            <QACategoryItem v-for="item in qaBoardCategoryResDtos" :key="item.categoryName" :item="item" @clickItem="categoryChange">

            </QACategoryItem>
          </div>

        </div>
      </v-navigation-drawer>
    </div>
    <div>
      <div class="nationSelect" @click="onGotoSelectNation">
        <div class="noneSelect" v-if="selectedNations() == -1 || !selectedNations()">
          <div class="nationImage">

          </div>
          <div class="nationText">
            국가 선택
          </div>
        </div>
        <div v-else class="nationSelectInfo">
          <img :src="filterNationInfo.flagImage" class="nationImage">
          <div class="nationText">
            {{ filterNationInfo.nationName }}
          </div>
        </div>

      </div>
    </div>

    <div class="CommunityContent">

      <div class="topDot dot">

      </div>

      <div class="qnaTitle">
        위캔고 인기 게시글
      </div>
      <div class="QARepeat">
        <QARepeat :items="qaRepeatResDto">

        </QARepeat>
      </div>
      <div class="QACurrentRepeat">
        <QACurrentRepeat :items="qaCurrentRepeatList" :key="qaCurrentRepeatList.length">

        </QACurrentRepeat>
      </div>

      <infinite-loading  :identifier="infiniteId" direction="bottom" @infinite="infiniteHandler" ></infinite-loading>
      <div class="bottomLoading">
      </div>
    </div>
    <NationSelectorDialog ref="NationSelectorDialog" @selectNation="onSelectNation">

    </NationSelectorDialog>
    <SearchTextDialog ref="SearchTextDialog" @searchText="onSearchText"> </SearchTextDialog>
    <div class="writeBtnRoot" @click="onGotoWritePage">
      <div class="writeBtn">
        <v-icon color="white">
          wc-writepen
        </v-icon>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import Vue, {VueConstructor} from "vue"

import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";
import {QABoardUseCase} from "@/Bis/QABoard/Domain/UseCase/QABoardUseCase";
import QARepeat from "@/components/Home/QARepeat.vue";
import QACurrentRepeat from "@/components/Home/QACurrentRepeat.vue";
import InfiniteLoading from "vue-infinite-loading";
import {MutationTypes} from "@/store/mutations";
import {QABoardFilterReqDto} from "@/Bis/QABoard/Dto/QABoardFilterReqDto";
import {PageWrap} from "@/Bis/Common/PageWrap";
import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";
import {FilterSearch} from "@/views/QA/Dto/FilterSearch";
import NationSelectorDialog,{ NationSelectorDialogType } from "@/components/QA/NationSelectorDialog.vue";
import SearchTextDialog, { SearchTextDialogType } from "@/components/QA/SearchTextDialog.vue";
import {SearchTextReqDto} from "@/components/QA/Dto/SearchTextReqDto";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import NationControlUseCase from "@/Bis/NationControl/Domain/UseCase/NationControlUseCase";
import {QABoardCategoryUseCase} from "@/Bis/QABoardCategory/Domain/QABoardCategoryUseCase";
import QACategoryItem from "@/components/QA/QACategoryItem.vue";

export default (Vue as VueConstructor<Vue & {
  $refs:{
    NationSelectorDialog: NationSelectorDialogType,
    SearchTextDialog: SearchTextDialogType
  }
}>).extend({
  components: {
    QARepeat, QACurrentRepeat, InfiniteLoading, NationSelectorDialog, SearchTextDialog, QACategoryItem
  },
  data() {
    return {
      loading: false,
      qaRepeatResDto: [] as QABoardResDto[],
      bottomLoading: false,
      qaBoardUseCase: new QABoardUseCase(),
      infiniteId: Date.now(),
      key: Date.now(),
      drawer: false,
      filterNationInfo: null as NationControlResDto | null,
      qaBoardCategoryResDtos: [] as QABoardCategoryResDto[]
    }
  },
  async mounted() {
    this.loading = true
    if(this.$store.state.qaBoardFilter.nation != -1 && this.$store.state.qaBoardFilter.nation){
      await this.setNationInfoFilter(this.$store.state.qaBoardFilter.nation)
    }
    let qaBoardCategoryUseCase = new QABoardCategoryUseCase();
    this.qaBoardCategoryResDtos = [{
      categoryName: "전체",
      orderIdx: -1,
      active: true
    } ,...await qaBoardCategoryUseCase.getList()];
    await this.getQARepeat();
    let qaBoardFilter = this.$store.state.qaBoardFilter;
    qaBoardFilter.pageReqDto.page = 0;
    this.$store.commit(MutationTypes.SET_QACURRENTREPEAT_LIST,[])
    await this.infiniteHandler(null)
    this.loading = false
  },
  computed:{
    qaCurrentRepeatList(): QABoardResDto[]{
        return this.$store.state.qaCurrentRepeatList
    },

  },
  methods: {
    async getQARepeat() {
      let reqDto = JSON.parse(JSON.stringify(this.$store.state.qaBoardFilter)) as QABoardFilterReqDto
      reqDto.pageReqDto = {
        page: 0,
        size: 3,
        sorts: [{
          column: "representative",
          direction: "Desc"
        }, {
          column: "view",
          direction: "Desc"
        }]
      }
      reqDto.withComment = false;
      this.qaRepeatResDto = (await this.qaBoardUseCase.getFilterDoc(reqDto)).content;
    },
    selectedNations(): number{
      return this.$store.state.qaBoardFilter.nation
    },
    async getCurrentQAFilterPage(): Promise<PageWrap<QABoardResDto>> {
      let qaBoardFilter = this.$store.state.qaBoardFilter;
      qaBoardFilter.withComment = true
      let currentSearchPage = qaBoardFilter.pageReqDto.page;
      let qaBoardResDtoPageWrap = await this.qaBoardUseCase.getFilterDoc(qaBoardFilter);
      if(currentSearchPage == 0) {
        let content = qaBoardResDtoPageWrap.content;
        this.$store.commit(MutationTypes.SET_QACURRENTREPEAT_LIST,content)
      } else {
        let content = qaBoardResDtoPageWrap.content;
        content = this.$store.state.qaCurrentRepeatList.concat(...content);
        this.$store.commit(MutationTypes.SET_QACURRENTREPEAT_LIST,content)
      }
      this.$store.commit(MutationTypes.SET_QACURRENTREPEAT_PAGESTATUS,qaBoardResDtoPageWrap)

      return qaBoardResDtoPageWrap;
    },
    async infiniteHandler($state: any) {
      await this.getCurrentQAFilterPage()
      console.log("infiniteHandler");
      let pageReqDto = this.$store.state.qaBoardFilter.pageReqDto;
      pageReqDto.page = pageReqDto.page+1
      if(this.$store.state.qaCurrentRepeatPageState.last){
        if($state){
          $state.complete();
        }
      }else {
        if($state){
          $state.loaded();
        }

      }
    },
    onGotoSelectNation(){
      this.$refs.NationSelectorDialog.open();
    },
    async setNationInfoFilter(id: number)  {
      let nationControlUseCase = new NationControlUseCase();
      let nationControlResDto = await nationControlUseCase.getNationInfo(id);
      this.filterNationInfo = nationControlResDto;
      this.$forceUpdate()
    },
    async onSelectNation(selectNationId: number){
      let qaBoardFilter = this.$store.state.qaBoardFilter;
      qaBoardFilter.nation = selectNationId;
      await this.setNationInfoFilter(selectNationId)
      if(selectNationId == -1){
        await this.filterSearch({
          nationId: null,
          searchMode: "",
          text: null
        })
      }else {
        await this.filterSearch({
          nationId: selectNationId,
          searchMode: "nation",
          text: null
        })
      }
    },
    async categoryChange(item: QABoardCategoryResDto){
      let qaBoardFilter = this.$store.state.qaBoardFilter;
      let pageReqDto = qaBoardFilter.pageReqDto;
      this.infiniteId = Date.now()
      pageReqDto.page = 0
      qaBoardFilter.mode=null;
      qaBoardFilter.nation=null;
      qaBoardFilter.title=null;
      qaBoardFilter.content=null;
      qaBoardFilter.writer=null;
      if(item.categoryName === '전체'){
        qaBoardFilter.category = null;
      }else {
        qaBoardFilter.category = item.categoryName;
      }
      await this.getQARepeat()
      await this.getCurrentQAFilterPage()
      this.drawer = false;
    },
    searchTextPage(){
      this.$refs.SearchTextDialog.open();
    },
    onSearchText(searchTextReqDto: SearchTextReqDto){
      this.filterSearch({
        searchMode: searchTextReqDto.textSearchMode,
        text: searchTextReqDto.searchText,
        nationId: this.$store.state.qaBoardFilter.nation
      })
    },
    async filterSearch(payload: FilterSearch) {
      let qaBoardFilter = this.$store.state.qaBoardFilter;
      let pageReqDto = qaBoardFilter.pageReqDto;
      this.infiniteId = Date.now()
      pageReqDto.page = 0
      qaBoardFilter.mode=payload.searchMode;
      qaBoardFilter.title=payload.text;
      qaBoardFilter.content=payload.text;
      qaBoardFilter.nation = payload.nationId;
      await this.getQARepeat()
      await this.getCurrentQAFilterPage()

    },
    goToHome(){
      this.$router.replace("/")
    },
    onGotoWritePage(){
      this.$router.push("/QA006")
    }
  },


})
</script>
<style scoped>
.Drawer{
  padding: 60px 16px 0px 24px;
}
.categoryRoot{
  margin-top: 24px;
}

.CommunityHomeRoot {
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.CommunityContent {
  flex-grow: 1;
  overflow-y: auto;
}

.CommunityContent::-webkit-scrollbar {
  display: none;
}

.top {
  width: 100%;
}

.top .actions{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #2661f1;
}

.topDot{
  margin-left: 24px;
}
.dot {
  width: 10px;
  height: 10px;
  border: solid 1px #242424;
  border-radius: 50%;
}

.qnaTitle {
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  color: #2f2f2f;
  margin: 0px 0px 10px 25px;
}

.QARepeat {
  padding: 25px;
}

.QACurrentRepeat {
  padding: 0px 25px;

}

.bottomLoading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottomLoading {
  margin-bottom: 40px;
}

.nationSelect {
  margin: 16px 24px 24px 25px;
  display: inline-block;
}
.nationSelect .noneSelect,.nationSelect .nationSelectInfo{
  border-radius: 4px;
  display: flex;
  border: 1px solid #a7aab2;;
  align-items: center;
  padding: 4px;
}
.nationSelect .nationImage{
  width: 40px;
  height: 20px;
  background-color: #a7aab2;
  border-radius: 4px;
  margin-right: 4px;
}
.nationSelect .nationText{
  margin-right: 50px;
  font-size: 13px;
  font-family: "Noto Sans KR";
  font-weight: bold;
}

.writeBtn{
  background-color: #2661f1;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.writeBtnRoot{
  border-radius: 50%;
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: #2661f130;

  z-index: 1;

}
</style>
