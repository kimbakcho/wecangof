<template>
  <div class="AdminAlarmContents">
    <div v-for="item in alarmDocs" :key="item.id" @click="docClick(item)" class="docBtn">
      {{ item.title }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {AdminContentSimpleResDto} from "@/Bis/AdminContent/Dto/AdminContentSimpleResDto";

export default Vue.extend({
  props:{
    alarmDocs: {
      type: Array as PropType<AdminContentSimpleResDto[]>,
    }
  },
  methods:{
    docClick(item: AdminContentSimpleResDto){
      this.$router.push({
        path: `/BC001/${item.id}`
      })
    }
  }
})
</script>
<style scoped>
.AdminAlarmContents{
  width: 100vw;
  height: 119px;
  padding: 25px 0px;
  background: #f5f7f8;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  transition: none !important;
}
.AdminAlarmContents::-webkit-scrollbar{
  display: none;
}
.docBtn{
  height: 59px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5eaef;
  padding: 25px;
  white-space: nowrap;
  margin-right: 25px;
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 13px;
  text-align: left;
  color: #242424;

}
.docBtn:first-child{
  margin-left: 25px;
}

</style>
