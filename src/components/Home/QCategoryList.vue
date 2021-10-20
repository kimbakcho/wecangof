<template>
  <div class="qCategoryListRoot">
    <button v-for="item in qaBoardCategorys" :key="item.categoryName" class="item" :class="{active: item.active}" @click="itemClick(item)">
        {{ item.categoryName }}
    </button>
  </div>
</template>
<script lang="ts">
import Vue, {PropType, VueConstructor} from "vue"
import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";

export default (Vue as VueConstructor<Vue & {
  qaBoardCategorys: QABoardCategoryResDto[]
}>).extend({
  inject: [
    "qaBoardCategorys"
  ],
  methods:{
    itemClick(item: QABoardCategoryResDto){
      this.qaBoardCategorys.forEach(x=>[
          x.active = false
      ])
      item.active = true
      this.$emit("change",item)
      this.$forceUpdate()
    }
  }

})
</script>
<style scoped>
.qCategoryListRoot {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.qCategoryListRoot::-webkit-scrollbar{
  display: none;
}

.qCategoryListRoot .item {
  height: 29px;
  border-radius: 14.5px;
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 8px 14px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  margin-left: 14px;
}

.qCategoryListRoot .item.active {
  background: #2661F1;
  border: unset;
}
</style>
