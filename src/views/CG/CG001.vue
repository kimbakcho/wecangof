<template>
  <div>
    <div>
      신고된 게시물
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
import QABadReportUseCase from "@/Bis/QABadReport/Domain/UseCase/QABadReportUseCase";
import {SortReqDto} from "@/Bis/Common/SortReqDto";

export default Vue.extend({
  data() {
    return {
      tableHeader: [
        {
          text: "신고자",
          value: "reportUser.nickName"
        },
        {
          text: "제목",
          value: "qaDoc.title"
        },
        {
          text: "작성 시간",
          value: "qaDoc.updateDateTime"
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
      items: [] as QABadReportResDto[],
      loading: false,
      serverItemsLength:0
    }
  },
  methods: {
    async searchItems(value: DataOptions) {
      this.loading = true;
      let qaBadReportUseCase = new QABadReportUseCase();
      let sortReqDtos = [] as SortReqDto[];

      for (let i = 0; i < value.sortBy.length; i++) {
        sortReqDtos.push({
          column: value.sortBy[i],
          direction: value.sortDesc[i] ? "Desc" : "Asc"
        })
      }

      let qaBadReportResDtoPageWrap = await qaBadReportUseCase.getReports({
        sorts: sortReqDtos,
        size: value.itemsPerPage,
        page: value.page - 1
      });
      this.items = qaBadReportResDtoPageWrap.content;
      this.serverItemsLength = qaBadReportResDtoPageWrap.totalElements;
      this.loading = false;
    },
    onView(item: QABadReportResDto){
      this.$router.push(`/QA003/${item.qaDoc.id}`)
    },
    async onDelete(item: QABadReportResDto){
      let result = await this.$swal({
        title: '정말 지우시 겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '지움',
        cancelButtonText: '취소',
      });
      if(result.isConfirmed){
        let qaBadReportUseCase = new QABadReportUseCase();
        await qaBadReportUseCase.deleteReportDoc(item.idx);
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
