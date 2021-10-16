<template>
  <div>
    <div class="top">
      <div class="search">
        <v-icon size="13">
          fas fa-search
        </v-icon>
      </div>
      <QCategoryList >

      </QCategoryList>
      <div class="divider">
      </div>
    </div>
    <div class="topDot dot">

    </div>
    <div class="qnaTitle">
      자주 묻는 질문
    </div>
    <div>
      카테고리 게시글
    </div>
    <div>
      질문들
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import QCategoryList from "@/components/Home/QCategoryList.vue";

export default Vue.extend({
  components:{
    QCategoryList
  },
  data(){
    return {

    }
  }
})
</script>
<style scoped>
.top{
  width: 100%;

}
.top .search{
  display: flex;
  height: 43px;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 25px;
}
.top .category{

}
.divider {
  height: 1px;
  margin: 24px 0 0;
  background-color: #e9ebf4;
}
.topDot {
  margin: 30px 0px 10px 25px;
}

.dot {
  width: 10px;
  height: 10px;
  border: solid 1px #242424;
  border-radius: 50%;
}
.qnaTitle{
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  color: #2f2f2f;
  margin: 0px 0px 10px 25px;
}
</style>
