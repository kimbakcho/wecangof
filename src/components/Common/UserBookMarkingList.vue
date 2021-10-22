<template>
  <div class="bookMarkRoot">
    <draggable v-model="userBookMarkList" class="drag" :options="dragOptions" @change="itemChange" :force-fallback="true" ref="drag">
      <CountryButton class="btn" v-for="item in userBookMarkList" :nation-control="item.nationId" :key="item.id" @tapNation="tapNation(item)" >
      </CountryButton>
    </draggable>
  </div>
</template>
<script lang="ts">
import Vue, {PropType, VueConstructor} from "vue"
import {UserBookMarkingCountryResDto} from "../../Bis/UserBookMarkingCountry/Dto/UserBookMarkingCountryResDto";
import CountryButton from "@/components/Common/CountryButton.vue";
import draggable from 'vuedraggable'
import UserBookMarkingCountryUseCase from "@/Bis/UserBookMarkingCountry/Domain/UseCase/UserBookMarkingCountryUseCase";

export default Vue.extend({
  components:{
    CountryButton,draggable
  },
  props: {
    initUserBookMarkList: {
      type: Array as PropType<UserBookMarkingCountryResDto[]>,
      required: true,
    }
  },
  mounted() {
    this.userBookMarkList = this.initUserBookMarkList;
  },
  data(){
    return {
      dragOptions: {
          delay: 200,
          touchStartThreshold: 5,
      },
      userBookMarkList: [] as UserBookMarkingCountryResDto[]
    }
  },
  methods:{
    tapNation(item: UserBookMarkingCountryResDto){
      this.$emit("tapNation",item)
    },
    itemChange(evt: any){
      let userBookMarkingCountryUseCase = new UserBookMarkingCountryUseCase();
      userBookMarkingCountryUseCase.changeOrderIdx(evt.moved.oldIndex,evt.moved.newIndex);
    }
  }
})
</script>
<style scoped>
.bookMarkRoot{

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

.drag .btn:nth-child(1){
  margin-left: 25px;
}
</style>
<style>

</style>
