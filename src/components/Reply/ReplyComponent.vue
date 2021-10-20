<template>
  <div class="ReplyComponentRoot">
    <div ref="row" v-for="item in qaBoardReplyResDtos" :key="item.id" class="row">
      <div v-if="isAdmin" @click="setRepresentativeComment($event,item)">
        우선 순위 {{ item.representativeComment }}
      </div>
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
import Vue, {PropType, VueConstructor} from "vue"
import UserProfile from "@/components/Common/UserProfile.vue";
import {QABoardReplyResDto} from "@/Bis/QABoardReply/Dto/QABoardReplyResDto";
import WCTimeUtil from "@/Bis/Common/WCTimeUtil";
import {DateTime} from "luxon";
import {QABoardUseCase} from "@/Bis/QABoard/Domain/UseCase/QABoardUseCase";
import QABoardReplyUseCase from "@/Bis/QABoardReply/Domain/UseCase/QABoardReplyUseCase";

const ReplyComponentRoot = (Vue as VueConstructor<Vue & {
  $refs:{
    row: HTMLDivElement[]
  }
}>).extend({
  components:{
    UserProfile
  },
  props:{
    qaBoardReplyResDtos: {
      type: Array as PropType<QABoardReplyResDto[]>,
      required: true
    }
  },
  computed:{
    isAdmin(): boolean{
      if(this.$store.state.isLogin){
        return this.$store.state.userInfo.role.indexOf("Admin") >= 0
      }else {
        return false;
      }

    }
  },
  methods:{
    getCreateTimeText(item: QABoardReplyResDto){
      return WCTimeUtil.timeForToday(DateTime.fromISO(item.updateDateTime).toJSDate())
    },
    getReplyText(item: QABoardReplyResDto){
      return item.content.replace(/\n/g, '<br/>')
    },
    getLastReplyDom(): HTMLDivElement{
      return this.$refs.row.reverse()[0]
    },
    async setRepresentativeComment(event: any,item: QABoardReplyResDto){
      if (event.stopPropagation)
        event.stopPropagation();

      event.preventDefault()
      let result: any = await this.$swal(
          {
            title: '우선순위 변경',
            input: 'number',
          }
      );
      if(result.value.length > 0) {
        let qaBoardReplyUseCase = new QABoardReplyUseCase();
        await qaBoardReplyUseCase.changeRepresentativeComment(item.id,Number(result.value));
        item.representativeComment = Number(result.value);
        this.$forceUpdate()
      }
    }
  }
})
export type ReplyComponentRootType = InstanceType<typeof ReplyComponentRoot>
export default ReplyComponentRoot;
</script>
<style scoped>
.ReplyComponentRoot{
  width: 100%;
}
.ReplyComponentRoot .row {
  padding: 21px 25px;
  border-top-style: solid;
  border-top-color: #E4E5EF;
  border-top-width: 1px;
}
.row .info1 {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
}

</style>
