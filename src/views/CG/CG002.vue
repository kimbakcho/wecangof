<template>
  <div>
    <div>
      댓글 게시물
    </div>
    <div class="tableRoot">
      <v-data-table :loading="loading" :headers="tableHeader" :options.sync="options" :items="items" :server-items-length="serverItemsLength" >
        <template v-slot:item.view="{ item }">
          <v-btn @click="onView(item)">
            조회
          </v-btn>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-btn @click="onDelete(item)">
            삭제
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {DataOptions, DataTableHeader} from "vuetify";
import {QABadReportResDto} from "@/Bis/QABadReport/Dto/QABadReportResDto";
import {SortReqDto} from "@/Bis/Common/SortReqDto";
import QABoardBadReplyReportUseCase from "@/Bis/QABoardBadReplyReport/Domain/UseCase/QABoardBadReplyReportUseCase";
import {QABoardBadReplyReportResDto} from "@/Bis/QABoardBadReplyReport/Dto/QABoardBadReplyReportResDto";

export default Vue.extend({
  data() {
    return {
      tableHeader: [
        {
          text: "신고자",
          value: "reportUser.nickName"
        },
        {
          text: "문서 제목",
          value: "reply.qaBoardId.title"
        },{
          text: "댓글 내용",
          value: "reply.content"
        },
        {
          text: "작성 시간",
          value: "reply.updateDateTime"
        },
        {
          text: "조회",
          value: "view"
        },
        {
          text: "삭제",
          value: "delete"
        }
      ] as DataTableHeader[],
      options: {} as DataOptions,
      items: [] as QABoardBadReplyReportResDto[],
      loading: false,
      serverItemsLength:0
    }
  },
  methods:{
    async searchItems(value: DataOptions){
      this.loading= true
      let sortReqDtos = [] as SortReqDto[];

      for (let i = 0; i < value.sortBy.length; i++) {
        sortReqDtos.push({
          column: value.sortBy[i],
          direction: value.sortDesc[i] ? "Desc" : "Asc"
        })
      }
      let qaBoardBadReplyReportUseCase = new QABoardBadReplyReportUseCase();
      let pageWrap = await qaBoardBadReplyReportUseCase.getReports({
        sorts: sortReqDtos,
        page: value.page - 1,
        size: value.itemsPerPage
      });
      this.items = pageWrap.content;
      this.serverItemsLength = pageWrap.totalElements
      this.loading= false;
    },
    onView(item: QABoardBadReplyReportResDto){
      this.$router.push(`/QA003/${item.reply.qaBoardId.id}`)
    },
    async onDelete(item: QABoardBadReplyReportResDto){
      let result = await this.$swal({
        title: '정말 지우시 겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '지움',
        cancelButtonText: '취소',
      });
      if(result.isConfirmed){
        let qaBoardBadReplyReportUseCase = new QABoardBadReplyReportUseCase();
        await qaBoardBadReplyReportUseCase.deleteReportReply(item.idx);
        await this.searchItems(this.options);
      }
    }
  },
  watch: {
    options(value: DataOptions) {
      this.searchItems(value);
    }
  }
})
</script>
<style scoped>
.tableRoot{
  padding: 16px;
}
</style>
