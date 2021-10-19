<template>
  <div class="CommunityHomeRoot">
    <div class="top">
      <div class="search">
        <v-icon size="13">
          fas fa-search
        </v-icon>
      </div>
      <QCategoryList>

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
        <QACurrentRepeat :items="qaCurrentRepeatResDto" :key="qaCurrentRepeatResDto.length">

        </QACurrentRepeat>
      </div>

      <infinite-loading direction="bottom" @infinite="infiniteHandler"></infinite-loading>
      <div class="bottomLoading">
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from "vue"
import QCategoryList from "@/components/Home/QCategoryList.vue";
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";
import {QABoardUseCase} from "@/Bis/QABoard/Domain/UseCase/QABoardUseCase";
import QARepeat from "@/components/Home/QARepeat.vue";
import QACurrentRepeat from "@/components/Home/QACurrentRepeat.vue";
import InfiniteLoading from "vue-infinite-loading";

export default Vue.extend({
  components: {
    QCategoryList, QARepeat, QACurrentRepeat, InfiniteLoading
  },
  data() {
    return {
      loading: false,
      qaRepeatResDto: [] as QABoardResDto[],
      qaCurrentRepeatResDto: [] as QABoardResDto[],
      bottomLoading: false
    }
  },
  async mounted() {
    this.loading = true
    let qaBoardUseCase = new QABoardUseCase();
    this.qaRepeatResDto = (await qaBoardUseCase.getFilterDoc({
      pageReqDto: {
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
    })).content;


    this.qaCurrentRepeatResDto = (await qaBoardUseCase.getFilterDoc({
      pageReqDto: {
        page: 0,
        size: 5,
        sorts: [{
          column: "updateDateTime",
          direction: "Desc"
        }]
      }
    })).content

    this.loading = false
  },
  methods: {
    infiniteHandler($state: any) {
      console.log("loaded")
      //example Code
      // setTimeout(async ()=>{
      //   $state.loaded();
      //   let qaBoardUseCase = new QABoardUseCase();
      //   let qaCurrentRepeatResDto = (await qaBoardUseCase.getFilterDoc({
      //     pageReqDto: {
      //       page: 0,
      //       size: 5,
      //       sorts: [{
      //         column: "updateDateTime",
      //         direction: "Desc"
      //       }]
      //     }
      //   })).content
      //   this.qaCurrentRepeatResDto.push(...qaCurrentRepeatResDto)
      // },1500)
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
