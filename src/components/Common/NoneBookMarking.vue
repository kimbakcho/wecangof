<template>
  <div class="NoneBookMarkingRoot" :style="{ backgroundImage: 'url(' + require('@/assets/bookmarkingempty.png') + ')' }">
    <div class="text">
      아래 ➕ 버튼을 눌러 가고 싶은 나라를 살펴봅시다
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({

})
</script>
<style scoped>
.NoneBookMarkingRoot{
  width: 100%;
  height: 70px;
  font-family: "Noto Sans KR";
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: left;
  background-repeat: repeat-x;

}
</style>
