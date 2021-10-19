<template>
  <div>
    <div class="row" v-for="(item,index) in items" :key="index">
      <div class="top">
        <div class="QTitle">
          <span class="inTitle">
              <span class="pre">
              Q
            </span>
            {{ item.title }}
          </span>
        </div>
        <UserProfile :user-info="item.writer" :text-newline="true">

        </UserProfile>
      </div>
      <div class="info1">
        <div>
           {{ item.classificationQuestions }}
        </div>
        <div>
          {{ item.nationName.nationName }}
        </div>
        <div>
          {{ getUploadTimeText(item.updateDateTime) }}
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";
import WCTimeUtil from "@/Bis/Common/WCTimeUtil";
import {DateTime} from "luxon";
import UserProfile from "@/components/Common/UserProfile.vue";

export default Vue.extend({
  components: {
    UserProfile
  },
  props: {
    items: {
      type: Array as PropType<QABoardResDto[]>,
      required: true
    }
  },
  methods: {
    getUploadTimeText(isoValue: string) {
      return WCTimeUtil.timeForToday(DateTime.fromISO(isoValue).toJSDate());
    },
  }
})
</script>
<style scoped>
.row {
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e9ebf4;
  padding: 15px;
  margin-bottom: 20px;
}

.row .top {
  display: flex;
  align-items: start;
}

.top .QTitle {
  display: flex;
  flex-grow: 1;
}

.QTitle .pre {
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 15px;
  color: #242424;
}

.QTitle .inTitle {
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 15px;
  color: #242424;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 15px;
  height: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}


.info1 {
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 10px;
  color: #e6e6e6;
  display:  flex;
}

.info1 div:nth-child(2){
  margin-left: 10px;
}
.info1 div:nth-child(3){
  margin-left: 10px;
}
</style>
