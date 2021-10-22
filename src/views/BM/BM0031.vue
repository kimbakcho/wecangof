<template>
  <div class="bm0031Root">
    <TopBar title="국가 검색" bg-color="#E9EBF4">
      <template v-slot:endSlot >
        <div @click="gotoDetailNation">
          <v-icon size="15" color="#323232">
            wc-search
          </v-icon>
        </div>
      </template>
    </TopBar>
    <section class="bm0031content">
      <ScrollPicker :options="scrollOptions" v-model="selectId">

      </ScrollPicker>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import TopBar from "@/components/Common/TopBar.vue";
import "vue-scroll-picker/dist/style.css"
import { ScrollPicker } from "vue-scroll-picker"
import {Route} from "vue-router";
import NationControlUseCase from "@/Bis/NationControl/Domain/UseCase/NationControlUseCase";
export default Vue.extend({
  props:{
    scrollOptions: {
      type: Array,
    }
  },
  components:{
    TopBar, ScrollPicker
  },
  data(){
    return {
      selectId: 1
    }
  },
  methods:{
    gotoDetailNation(){
      console.log("gotoDetailNation")
      this.$router.replace({
        path: `/BM004/${this.selectId}`
      })
    }
  },
  async beforeRouteEnter(to: Route, from: Route, next: any) {
    let nationControlUseCase = new NationControlUseCase();
    let nationControlResDtos = await nationControlUseCase.getFilter({});
    let params: any = to.params;
    params.scrollOptions = nationControlResDtos.map(x=>{
      return {
        name: x.nationName,
        value: x.id
      }
    })
    next();
  }

})
</script>
<style scoped>
.bm0031Root{
  width: 100vw;
  height: 100vh;
}
.bm0031content{
  width: 100%;
  height: 100%;
  background-color: #f4f5fc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style>
.vue-scroll-picker-layer .top{
  background: linear-gradient(180deg,#f4f5fc 20%, rgba(255,255,255,0.7));
}
.vue-scroll-picker-layer .bottom{
  background: linear-gradient(0deg,#f4f5fc 20%, rgba(255,255,255,0.7));
}
</style>
