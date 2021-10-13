<template>
  <div class="bookMarkRoot">
    <draggable v-model="userBookMarkList"  class="drag" :options="dragOptions" @change="itemChange" :force-fallback="true" :scroll-sensitivity="200">
      <CountryButton class="btn" v-for="item in userBookMarkList" :nation-control="item.nationId" :key="item.id" @tapNation="tapNation(item)" >

      </CountryButton>
    </draggable>

  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {UserBookMarkingCountryResDto} from "../../Bis/UserBookMarkingCountry/Dto/UserBookMarkingCountryResDto";
import CountryButton from "@/components/Common/CountryButton.vue";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import draggable from 'vuedraggable'
import UserBookMarkingCountryUseCase from "@/Bis/UserBookMarkingCountry/Domain/UseCase/UserBookMarkingCountryUseCase";

export default Vue.extend({
  components:{
    CountryButton,draggable
  },
  props: {
    userBookMarkList: {
      type: Array as PropType<UserBookMarkingCountryResDto[]>,
      required: true
    }
  },

  data(){
    return {
      dragOptions: {
          delay: 600
      }
    }
  },
  methods:{
    tapNation(item: UserBookMarkingCountryResDto){
      this.$emit("tapNation",item)
    },
    itemChange(evt: any){
      let userBookMarkingCountryUseCase = new UserBookMarkingCountryUseCase();
      console.log(evt)
      userBookMarkingCountryUseCase.changeOrderIdx(evt.moved.oldIndex,evt.moved.newIndex);

    }
  }
})
</script>
<style scoped>
.bookMarkRoot{

  padding: 0px 25px;
}
.bookMarkRoot .drag{
  display: flex;
  overflow-x: auto;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
}
.bookMarkRoot .drag::-webkit-scrollbar{
  display: none;
}
.btn {
  min-width: 70px;
}
</style>
<style>

</style>
