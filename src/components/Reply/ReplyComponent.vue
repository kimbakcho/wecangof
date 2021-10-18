<template>
  <div class="ReplyComponentRoot">
    <div v-for="item in qaBoardReplyResDtos" :key="item.id" class="row">
      <div class="info1">
        <UserProfile :user-info="item.writer"></UserProfile>
        <div>
          {{ getCreateTimeText(item) }}
        </div>
      </div>
      <div v-html="getReplyText(item)">

      </div>
    </div>

  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import UserProfile from "@/components/Common/UserProfile.vue";
import {QABoardReplyResDto} from "@/Bis/QABoardReply/Dto/QABoardReplyResDto";
import WCTimeUtil from "@/Bis/Common/WCTimeUtil";
import {DateTime} from "luxon";

export default Vue.extend({
  components:{
    UserProfile
  },
  props:{
    qaBoardReplyResDtos:{
      type: Array as PropType<QABoardReplyResDto[]>,
      required: true
    }
  },
  methods:{
    getCreateTimeText(item: QABoardReplyResDto){
      return WCTimeUtil.timeForToday(DateTime.fromISO(item.updateDateTime).toJSDate())
    },
    getReplyText(item: QABoardReplyResDto){
      return item.content.replace(/\n/g, '<br/>')
    }
  }
})
</script>
<style scoped>
.ReplyComponentRoot{
  width: 100%;
}
.ReplyComponentRoot .row {
  padding: 21px 25px;
}
.row .info1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
