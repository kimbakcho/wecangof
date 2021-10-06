<template>
  <div class="bookMarkRoot">
    <CountryButton class="btn" v-for="item in userBookMarkList" :nation-control="item.nationId" :key="item.id" @tapNation="tapNation(item)">

    </CountryButton>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {UserBookMarkingCountryResDto} from "../../Bis/UserBookMarkingCountry/Dto/UserBookMarkingCountryResDto";
import CountryButton from "@/components/Common/CountryButton.vue";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";

export default Vue.extend({
  components:{
    CountryButton
  },
  props: {
    userBookMarkList: {
      type: Array as PropType<UserBookMarkingCountryResDto[]>,
      required: true
    }
  },
  methods:{
    tapNation(item: UserBookMarkingCountryResDto){
      this.$emit("tapNation",item)
    }
  }
})
</script>
<style scoped>
.bookMarkRoot{
  display: flex;
  overflow-x: auto;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0px 25px;
}
.bookMarkRoot::-webkit-scrollbar{
  display: none;
}
.btn {
  min-width: 70px;
}

</style>
