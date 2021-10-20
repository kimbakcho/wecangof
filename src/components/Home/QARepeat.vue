<template>
  <div class="QARepeatRoot">
    <div v-if="items.length > 0" >
      <div v-for="item in items" :key="item.id" class="row" @click="itemClick(item)">
        <div class="itemCategory">
          {{ item.classificationQuestions }}
        </div>
        <div class="itemTitle">
          {{ item.title }}
        </div>
      </div>
    </div>
    <div v-else class="emptyBlock">
      게시물이 없습니다.
    </div>

  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";

export default Vue.extend({
  props:{
    items: {
      type: Array as PropType<QABoardResDto[]>,
      required: true
    }
  },
  methods:{
    itemClick(item: QABoardResDto) {
      this.$router.push({
        path: `/QA003/${item.id}`
      })
    }
  }
})
</script>
<style scoped>
.QARepeatRoot{
  width: 100%;
  border-radius: 10px;
  background: #f4f5fc;
  padding: 0px 15px;
}
.QARepeatRoot .row{
  display: flex;
  align-items: center;
  padding: 15px 0px;
  border-bottom: 1px solid #E4E5EF;
}
.row .itemCategory {
  min-width: 6em;
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 12px;
  color: #a7aab2;
}
.row .itemTitle{
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 12px;
  color: #242424;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.row:last-child {
  border-bottom: unset;
}
.emptyBlock{
  font-family: "Noto Sans KR";
  height: 143px;
  border-radius: 10px;
  background: #f4f5fc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
  color: #a7aab2;
}
</style>
