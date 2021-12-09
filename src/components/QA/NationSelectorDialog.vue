<template>
  <!--scroll-picker을 사용할때 dialog transition="dialog-bottom-transition" 을 사용 해야 한다 기본으로 사용 하게 되면 Drag 오류남 -->
  <v-dialog v-model="dialog" fullscreen hide-overlay eager transition="dialog-bottom-transition">
    <div class="nationSelectorDialog">
      <div class="topBar">
        <img src="@/assets/back_button.png"
             class="back_button" @click="closeDialog">
        <div class="topTitle">
          국가 검색
        </div>
      </div>
      <div class="nationSelectorDialogContent">
        <div class="nationSearch">
          <scroll-picker :options="nationOptions" v-model="selectId" v-if="loaded">
          </scroll-picker>
        </div>

      </div>
      <div class="bottomActions" @click="onSelectNation">
        확인
      </div>
    </div>

  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue"
import "vue-scroll-picker/dist/style.css"
import {ScrollPicker} from "vue-scroll-picker"
import NationControlUseCase from "@/Bis/NationControl/Domain/UseCase/NationControlUseCase";

const NationSelectorDialog = Vue.extend({
  components: {
    ScrollPicker
  },

  data() {
    return {
      dialog: false,
      selectId: null,
      loaded: false,
      nationOptions: [] as any[]
    }
  },
  methods: {
    async open() {
      this.dialog = true;
      let nationControlUseCase = new NationControlUseCase();
      let nationControlResDtos = await nationControlUseCase.getFilter({});
      let nationItems = nationControlResDtos.map(x => {
        return {
          name: x.nationName,
          value: x.id
        }
      });
      this.nationOptions = [
        {
          name: "전체",
          value: -1
        },
        ...nationItems
      ]
      this.loaded = true;
    },
    closeDialog() {
      this.dialog = false
    },
    onSelectNation() {
      this.$emit("selectNation", this.selectId);
      this.dialog = false;
    }
  }
})

export default NationSelectorDialog;
export type NationSelectorDialogType = InstanceType<typeof NationSelectorDialog>;
</script>
<style scoped>
.topBar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 63px;
  background-color: #e9ebf4;
}

.topBar img {
  width: 19px;
  height: 15px;
  margin-left: 25px;
}

.topBar .topTitle {
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.nationSelectorDialogContent {
  flex-grow: 1;
  background-color: #f4f5fc;
  align-items: center;
  justify-content: center;
}

.nationSearch {
  width: 100%;
  height: 100%;
  background-color: #f4f5fc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottomActions {
  width: 100%;
  height: 56px;
  background-color: #2661f1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}



.nationSelectorDialog {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
}
</style>
<style>
.nationSelectorDialog .vue-scroll-picker-layer .top {
  background: linear-gradient(180deg, #f4f5fc 20%, rgba(255, 255, 255, 0.7));
}

.nationSelectorDialog .vue-scroll-picker-layer .bottom {
  background: linear-gradient(0deg, #f4f5fc 20%, rgba(255, 255, 255, 0.7));
}
</style>
