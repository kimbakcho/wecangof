<template>
  <div>
    <div class="actions">
      <v-btn @click="writePage">
        작성하기
      </v-btn>

    </div>
    <div class="searchBar">
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </div>
    <div class="content">
      <v-data-table :items="docs" :headers="tableHeader" item-key="id" :search="search">
        <template v-slot:item.view="{ item }">
          <button @click="view(item)">
            조회
          </button>
        </template>
        <template v-slot:item.modify="{ item }">
          <button @click="modify(item)">
            수정
          </button>
        </template>
        <template v-slot:item.delete="{ item }">
          <button @click="docDelete(item)">
            삭제
          </button>
        </template>
      </v-data-table>
    </div>


  </div>
</template>
<script lang="ts">
import Vue from "vue"
import AdminContentUseCase from "@/Bis/AdminContent/Domain/UseCase/AdminContentUseCase";
import {AdminContentSimpleResDto} from "@/Bis/AdminContent/Dto/AdminContentSimpleResDto";
import {DataTableHeader} from "vuetify";

export default Vue.extend({

  data() {
    return {
      docs: [] as AdminContentSimpleResDto[],
      search: "",
      tableHeader: [
        {
          value: "id",
          text: "id"
        },
        {
          value: "category",
          text: "카테고리"
        }, {
          value: "orderIdx",
          text: "우선 순위"
        }
        , {
          value: "title",
          text: "제목"
        }, {
          value: "createTime",
          text: "생성 시간"
        }, {
          value: "updateTime",
          text: "수정 시간"
        }, {
          value: "view",
          text: "조회"
        },
        {
          value: "modify",
          text: "수정"
        }, {
          value: "delete",
          text: "삭제"
        }
      ] as DataTableHeader[]
    }
  },
  async mounted() {
    let adminContentUseCase = new AdminContentUseCase();
    this.docs = await adminContentUseCase.docs();
  },

  methods: {
    writePage() {
      this.$router.push(({
        path: "/WCAdmin/CC002/-1"
      }))
    },
    modify(item: AdminContentSimpleResDto) {
      this.$router.push({
        path: `/WCAdmin/CC002/${item.id}`
      })
    },
    async docDelete(item: AdminContentSimpleResDto) {
      let adminContentUseCase = new AdminContentUseCase();
      await adminContentUseCase.delDoc(item.id);
      this.docs = await adminContentUseCase.docs();

    },
    view(item: AdminContentSimpleResDto) {
      this.$router.push({
        path: `/BC001/${item.id}`
      })
    }
  },
})
</script>
<style scoped>
.actions {
  display: flex;
  justify-content: end;
  padding: 25px;
}

.content {
  padding: 24px;
}

.searchBar {
  display: flex;
  padding: 24px;
}
</style>
