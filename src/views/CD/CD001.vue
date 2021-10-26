<template>
  <div>
    <h3>
      카테고리 관리
    </h3>
    <div class="actions">
      <v-btn @click="addCategory">
        카테고리 추가
      </v-btn>
    </div>
    <v-data-table :items="items" :headers="tableHeader">
      <template v-slot:item.modify="{ item }">
        <v-btn @click="modify(item)" small danse>
          <v-icon>
            fas fa-edit
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:item.up="{ item }" >
        <v-btn @click="up(item)" small>
          <v-icon>
            fas fa-arrow-up
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:item.down="{ item }">
        <v-btn @click="down(item)" small>
          <v-icon>
            fas fa-arrow-down
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn @click="deleteItem(item)" small>
          <v-icon>
            fas fa-trash
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";
import {QABoardCategoryUseCase} from "@/Bis/QABoardCategory/Domain/QABoardCategoryUseCase";
import {DataTableHeader} from "vuetify";

export default Vue.extend({
  data(){
    return {
      items: [] as QABoardCategoryResDto[],
      tableHeader: [
        {
          text: "이름",
          value: "categoryName",
        },
        {
          text: "수정",
          value: "modify"
        },
        {
          text: "up",
          value: "up"
        },
        {
          text: "down",
          value: "down"
        },
        {
          text: "delete",
          value: "delete"
        }
      ] as DataTableHeader[]
    }
  },
  async mounted() {
    let qaBoardCategoryUseCase: QABoardCategoryUseCase = new QABoardCategoryUseCase();
    this.items = await qaBoardCategoryUseCase.getList();
  },
  methods:{
    async modify(item: QABoardCategoryResDto){
      let result: any = await this.$swal(
          {
            title: '이름 변경',
            input: 'text'
          }
      );
      if(result.value.length > 0){
        let qaBoardCategoryUseCase = new QABoardCategoryUseCase();
        await qaBoardCategoryUseCase.changeName({
          newCategoryName: result.value,
          oldCategoryName: item.categoryName
        })
        this.items = await qaBoardCategoryUseCase.getList();
      }
    },
    async up(item: QABoardCategoryResDto) {
      let findIndex = this.items.findIndex(value => value.categoryName == item.categoryName);
      if(findIndex != 0){
        let qaBoardCategoryUseCase = new QABoardCategoryUseCase();
        let upItem = this.items[findIndex - 1];
        await qaBoardCategoryUseCase.changeOrder({
          replaceCategoryName1: upItem.categoryName,
          replaceCategoryName2: item.categoryName
        })
        this.items = await qaBoardCategoryUseCase.getList();
      }
    },
    async down(item: QABoardCategoryResDto) {
      let findIndex = this.items.findIndex(value => value.categoryName == item.categoryName);
      if(findIndex < (this.items.length-1)){
        let qaBoardCategoryUseCase = new QABoardCategoryUseCase();
        let upItem = this.items[findIndex + 1];
        await qaBoardCategoryUseCase.changeOrder({
          replaceCategoryName1: upItem.categoryName,
          replaceCategoryName2: item.categoryName
        })
        this.items = await qaBoardCategoryUseCase.getList();
      }
    },
    async deleteItem(item: QABoardCategoryResDto) {
      let result: any =await this.$swal(
          {
            title: '정말 지우시 겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '지움',
            cancelButtonText: '취소',
          }
      )
      if(result.isConfirmed){
        let qaBoardCategoryUseCase = new QABoardCategoryUseCase();
        await qaBoardCategoryUseCase.deleteItem(item.categoryName)
        this.items = await qaBoardCategoryUseCase.getList();
      }
    },
    async addCategory(){
      let result: any = await this.$swal(
          {
            title: '카테고리 이름',
            input: 'text',
          }
      );
      if(result.value.length > 0) {
        let qaBoardCategoryUseCase = new QABoardCategoryUseCase();
        await qaBoardCategoryUseCase.input(result.value)
        this.items = await qaBoardCategoryUseCase.getList();
      }
    },


  }

})
</script>
<style scoped>

</style>
