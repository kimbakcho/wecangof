<template>
  <div class="root" @click="tapNation">
    <div class="imgRoot">
      <img :src="nationControl.flagImage" class="flagImg" @contextmenu="contextMenuUp">
    </div>

    <div class="textRoot">
      <div>
        {{ nationControl.nationName }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";

export default Vue.extend({

  props:{
    nationControl: {
      type: Object as PropType<NationControlResDto>,
      required: true
    }
  },

  methods:{
    tapNation(){
      this.$emit("tapNation",this.nationControl)
    },
    contextMenuUp(event: any){
      if (event.stopPropagation)
        event.stopPropagation();

      event.preventDefault()

      event.cancelBubble = true;
      return false;
    }
  }

})
</script>
<style scoped>
.imgRoot{
  display: flex;
  justify-content: center;
}
.textRoot{
  margin-top: 5px;
  display: flex;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-size: 13px;
}
.flagImg{
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: solid 1px #e9ebf4;
  -webkit-user-select: none !important; /* disable selection/Copy of UIWebView */
  -webkit-touch-callout: none !important; /* disable the IOS popup when long-press on a link */
}
.root{
  max-width: 72px;
  max-height: 74px;
  overflow: hidden;
}
</style>
