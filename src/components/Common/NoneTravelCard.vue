<template>
  <div class="rootBg">
    <div>
      <img src="@/assets/plane_ico.png">
    </div>
    <div>
      담아둔 여행지가 없습니다.
    </div>
    <div>
      관심있는 여행지를 추가해보세요
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({

})
</script>
<style scoped>
.rootBg{
  height: 193px;
  border-radius: 10px;
  box-shadow: 0 10px 25px 0 rgba(17, 18, 20, 0.08);
  background-color: #dbe5fd;
}
.rootBg div:nth-child(1){
  padding-top: 47px;
  display: flex;
  justify-content: center;
}
.rootBg div:nth-child(1) img{
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.rootBg div:nth-child(2){
  padding-top: 20px;
  display: flex;
  font-family: Noto Sans KR;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: #242424;
}
.rootBg div:nth-child(3){
  padding-top: 15px;
  display: flex;
  font-family: Noto Sans KR;
  justify-content: center;
  font-size: 13px;
  color: #a7aab2;
}
</style>
