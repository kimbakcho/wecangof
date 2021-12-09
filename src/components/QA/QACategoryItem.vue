<template>
  <div class="categoryItem" @click="onClickItem">
    {{ item.categoryName }}
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";

export default Vue.extend({
  props:{
    item: {
      type: Object as PropType<QABoardCategoryResDto>,
      required: true
    }
  },
  methods:{
    onClickItem(){
      this.$emit("clickItem",this.item);
    }
  }
})
</script>
<style scoped>
.categoryItem{
  width: 100%;
  color: white;
  padding-bottom: 10px;
  border-bottom: solid 1px white;
  margin-top: 8px;
}
</style>
