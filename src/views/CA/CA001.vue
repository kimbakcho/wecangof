<template>
  <div>
    <h3 class="ma-4">
      국가 관리
    </h3>
    <v-card class="mainTableCard">
      <v-card-title>
        조회
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :loading="loaded" :search="search" item-key="id" :headers="tableHeader" :items="nations">
        <template v-slot:item.travelFlag="{ item }" >
          {{ item.travelFlag ? "가능" : "불가능" }}
        </template>
        <template v-slot:item.nation.displayFlag="{ item }" >
          <div>
            <v-checkbox v-model="item.nation.displayFlag" hide-details dense @change="displayFlagChange(item)">

            </v-checkbox>
          </div>
        </template>
        <template v-slot:item.preview="{ item }" >
          <button @click="preview(item)">
            조회
          </button>
        </template>
        <template v-slot:item.modify="{ item }" >
          <button @click="modify(item)">
            수정
          </button>
        </template>

      </v-data-table>
    </v-card>

  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";
import ImmigrationStatusUseCase from "@/Bis/ImmigrationStatus/Domain/UseCase/ImmigrationStatusUseCase";
import {DataTableHeader} from "vuetify";
import NationControlUseCase from "@/Bis/NationControl/Domain/UseCase/NationControlUseCase";

export default Vue.extend({

  data(){
    return {
      nations: [] as ImmigrationStatusSimpleResDto[],
      loaded: false,
      search: '',
      tableHeader:[
        {
          value: "nation.nationName",
          text: "국가"
        },{
          value: "continent",
          text: "대륙"
        },{
          value: "travelFlag",
          text: "여행"
        },{
          value: "mandatoryQuarantineText",
          text: "의무 격리"
        },{
          value: "updateDateTime",
          text: "마지막 업데이트"
        },
        {
          value: "nation.displayFlag",
          text: "표시"
        },
        {
          value: "preview",
          text: "미리보기"
        },
        {
          value: "modify",
          text: "수정"
        }
      ]as DataTableHeader[]
    }
  },
  methods:{
    preview(item: ImmigrationStatusSimpleResDto){
      console.log(item);
    },
    modify(item: ImmigrationStatusSimpleResDto){
      console.log(item);
      this.$router.push({
        path: `/WCAdmin/CB002/${item.nation.id}`
      })
    },
    async displayFlagChange(item :ImmigrationStatusSimpleResDto ){
      let nationControlUseCase = new NationControlUseCase();
      await nationControlUseCase.setDisplayFlag(item.nation.id,item.nation.displayFlag);
    }

  },
  async mounted() {
    let immigrationStatusUseCase = new ImmigrationStatusUseCase();
    this.loaded = true;
    this.nations = await immigrationStatusUseCase.allInfo();
    this.loaded = false;
  }

})
</script>
<style scoped>
.mainTableCard{
  margin: 24px;
}
</style>
