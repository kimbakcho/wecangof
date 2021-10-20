<template>
  <div class="CommunityHomeRoot">
    <div class="top">
      <div class="search" @click="searchPage">
        <v-icon size="13">
          fas fa-search
        </v-icon>
      </div>
      <QCategoryList @change="categoryChange">

      </QCategoryList>
      <div class="divider">
      </div>
    </div>
    <div class="CommunityContent">

      <div class="topDot dot">

      </div>

      <div class="qnaTitle">
        자주 묻는 질문
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
    <QA002 ref="QA002" @filterSearch="filterSearch">

    </QA002>
  </div>
</template>
<script lang="ts">
import Vue, {VueConstructor} from "vue"
import QCategoryList from "@/components/Home/QCategoryList.vue";
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";
import {QABoardUseCase} from "@/Bis/QABoard/Domain/UseCase/QABoardUseCase";
import QARepeat from "@/components/Home/QARepeat.vue";
import QACurrentRepeat from "@/components/Home/QACurrentRepeat.vue";
import InfiniteLoading from "vue-infinite-loading";
import {MutationTypes} from "@/store/mutations";
import {QABoardFilterReqDto} from "@/Bis/QABoard/Dto/QABoardFilterReqDto";
import {PageWrap} from "@/Bis/Common/PageWrap";
import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";
import QA002, {QA002Type} from "@/views/QA/QA002.vue";
import {FilterSearch} from "@/views/QA/Dto/FilterSearch";

export default (Vue as VueConstructor<Vue & {
  $refs:{
    QA002: QA002Type
  }
}>).extend({
  components: {
    QCategoryList, QARepeat, QACurrentRepeat, InfiniteLoading, QA002
  },
  data() {
    return {
      loading: false,
      qaRepeatResDto: [] as QABoardResDto[],
      bottomLoading: false,
      qaBoardUseCase: new QABoardUseCase(),
      infiniteId: Date.now()
    }
  },
  async mounted() {
    this.loading = true

    await this.getQARepeat();
    //
    // await this.getCurrentQAFilterPage();

    this.loading = false
  },
  computed:{
    qaCurrentRepeatList(): QABoardResDto[]{
        return this.$store.state.qaCurrentRepeatList
    }
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
      let pageReqDto = this.$store.state.qaBoardFilter.pageReqDto;
      pageReqDto.page = pageReqDto.page+1
      if(this.$store.state.qaCurrentRepeatPageState.last){
        $state.complete();
      }else {
        $state.loaded();
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
    },
    searchPage(){
      this.$refs.QA002.open();
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

    }
  }
})
</script>
<style scoped>
.CommunityHomeRoot {
  display: flex;
  flex-direction: column;
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

.top .search {
  display: flex;
  height: 43px;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 25px;
}

.divider {
  height: 1px;
  margin: 24px 0 0;
  background-color: #e9ebf4;
}

.topDot {
  margin: 30px 0px 10px 25px;
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
</style>
