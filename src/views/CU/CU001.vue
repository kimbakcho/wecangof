<template>
  <div>
    <h3 class="CU001header">
      회원
    </h3>
    <div>
      <v-text-field v-model="nickNameFilter" clearable class="nickName" label="닉네임" @input="changeFilter">

      </v-text-field>
    </div>
    <div class="CU001Table">
      <v-data-table :items="items" :options.sync="options" :loading="loading" :server-items-length="serverItemLength" :headers="tableHeader">
        <template v-slot:item.profileImage=" { item } " >
          <img :src="item.profileImage" class="profile">
        </template>
        <template v-slot:item.delete=" { item } ">
          <v-btn @click="deleteItem(item)">
            <v-icon>
              fas fa-trash
            </v-icon>
          </v-btn>
        </template>

      </v-data-table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {DataOptions, DataTableHeader} from "vuetify";
import MemberManagementUseCase from "@/Bis/MemberManagement/Domain/UseCase/MemberManagementUseCase";
import {SortReqDto} from "@/Bis/Common/SortReqDto";
import {MemberManagementResDto} from "@/Bis/MemberManagement/Dto/MemberManagementResDto";
import {QABoardCategoryUseCase} from "@/Bis/QABoardCategory/Domain/QABoardCategoryUseCase";

export default Vue.extend({
  data(){
    return {
      items: [] as MemberManagementResDto[],
      options: {} as DataOptions,
      memberManagementUseCase: new MemberManagementUseCase(),
      nickNameFilter: "",
      loading: false,
      serverItemLength: 0,
      tableHeader: [
        {
           text:"",
           value:"profileImage"
        },
        {
          text:"uid",
          value: "uid"
        },
        {
          text: "닉네임",
          value: "nickName"
        },
        {
          text: "실제 이름",
          value: "realName"
        },
        {
          text: "가입 일자",
          value: "joinDate"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "삭제",
          value: "delete"
        }
      ] as DataTableHeader[]
    }
  },
  methods:{
    async searchTextPage(value: DataOptions){
      this.loading = true;
      let sortReqDtos = [] as SortReqDto[];

      for(let i=0;i<value.sortBy.length;i++){
        sortReqDtos.push({
          column: value.sortBy[i],
          direction: value.sortDesc[i] ? "Desc" : "Asc"
        })
      }

      let memberManagementResDtos = await this.memberManagementUseCase.getMemberList({
        nickName: this.nickNameFilter,
        pageReqDto: {
          page: value.page - 1,
          size: value.itemsPerPage,
          sorts: sortReqDtos
        }
      });

      this.items = memberManagementResDtos.content

      this.serverItemLength = memberManagementResDtos.totalElements;

      this.loading = false;
    },
    changeFilter(){
      this.searchTextPage(this.options);
    },
    async deleteItem(item: MemberManagementResDto){
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
        let memberManagementUseCase = new MemberManagementUseCase();
        await memberManagementUseCase.deleteMember(item.uid)
        await this.searchTextPage(this.options);
      }
    }
  },
  watch:{
    options(value: DataOptions) {
      this.searchTextPage(value);
    }
  }


})
</script>
<style scoped>
.CU001header{
  padding: 25px;
}
.CU001Table{
  padding: 25px;
}
.profile{
  border-radius: 50%;
  width: 25px;
  height: 25px;
  object-fit: cover;
}
.nickName{
  max-width: 200px;
  padding-left: 25px;
}
</style>
