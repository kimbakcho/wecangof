<template>
  <div>
    <div>
      국가 선택(선택)
    </div>
    <v-select
        :items="nations"
        outlined
        item-text="nationName"
        return-object
        v-model="value"
        clearable
        background-color="#e9ebf4"
        label="특정 국가에 한하는 질문일 때 선택세요"
        class="nations"
        hide-details
        dense
        @change="change"
    ></v-select>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";

export default Vue.extend({
  props:{
    nations: {
      type: Array as PropType<NationControlResDto[]>,
      required: true
    },
    value: {
      type: Object as PropType<NationControlResDto>,
    }
  },

  methods:{
    change(value: NationControlResDto){
      this.$emit("input",value)
    }
  }
})
</script>
<style scoped>
.nations{
  margin-top: 10px !important;
}

</style>

<style>
.nations fieldset{
  border: unset !important;
}
</style>
