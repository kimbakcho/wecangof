<template>
  <div>
    <div>
      질문 분류
    </div>
    <v-select
        :items="qaCategorys"
        outlined
        item-text="categoryName"
        return-object
        v-model="value"
        clearable
        dense
        background-color="#e9ebf4"
        hide-details
        label="카테고리 선택"
        class="qaCategory"
        @change="change"
    ></v-select>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";

export default Vue.extend({
  props:{
    qaCategorys: {
      type: Array as PropType<QABoardCategoryResDto[]>,
      required: true
    },
    value:{
      type: Object as PropType<QABoardCategoryResDto | null>,
    }
  },
  methods:{
    change(value: QABoardCategoryResDto){
      this.$emit("input",value)
    }
  }
})
</script>
<style scoped>
.qaCategory{
  margin-top: 10px !important;
}

</style>
<style>
.qaCategory fieldset{
  border: unset !important;
}
</style>
