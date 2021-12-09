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
      <div class="replyContentRow">
        <div v-html="getReplyText(item)" class="replyContent">

        </div>
        <div class="options" @click="onOpenOption(item)">
          <v-icon size="15">
            fas fa-ellipsis-v
          </v-icon>
        </div>
      </div>
    </div>
    <v-bottom-sheet v-model="optionDialog" max-width="80%"  inset content-class="QA003optionSheet">
      <v-sheet class="QA003optionSheet">
        <div @click="modifyReply" class="optionItem" v-if="isMyReply()">
          수정하기
        </div>
        <div @click="deleteReply" class="optionItem" v-if="isMyReply()">
          삭제하기
        </div>
        <div @click="qaReplyReport" class="optionItem qaBadReplyReport" v-if="canBadReplyReport()" >
          신고하기
        </div>
        <div @click="optionDialog = false" class="optionItem">
          닫기
        </div>
      </v-sheet>
    </v-bottom-sheet>

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
  data(){
    return {
      currentOptionClickItem: null as QABoardReplyResDto| null,
      optionDialog: false
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
    onOpenOption(optionItem: QABoardReplyResDto){
      this.currentOptionClickItem = optionItem;
      this.optionDialog = true
      this.$forceUpdate()

    },
    isMyReply(){
      if(this.currentOptionClickItem != null){
        if(this.$store.state.isLogin ){
          if(this.currentOptionClickItem.writer.uid == this.$store.state.userInfo.uid){
            return true;
          }
          if(this.$store.state.userInfo.role == "Admin"){
            return true;
          }
        }
      }
      return false;
    },
    canBadReplyReport(){
      if(!this.$store.state.isLogin){
        return true;
      }else {
        if(this.currentOptionClickItem != null){
          if(this.currentOptionClickItem.writer.uid != this.$store.state.userInfo.uid){
            return true;
          }
        }

      }
      return false;
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
    },
    async modifyReply(){

      let result = await this.$swal({
        title: "댓글 수정 내용을 입력 하세요.",
        input: "text",
        showCancelButton: true,
        confirmButtonText: '수정',
        cancelButtonText: '취소'
      })
      if(result.isConfirmed){
        if(this.currentOptionClickItem != null){
          let qaBoardReplyUseCase = new QABoardReplyUseCase();
          let resultResDto = await qaBoardReplyUseCase.updateReply({
            replyId: this.currentOptionClickItem.id,
            replyText: result.value
          })
          this.currentOptionClickItem.content = resultResDto.content;
          this.currentOptionClickItem.updateDateTime = resultResDto.updateDateTime
          this.optionDialog = false;
        }
      }

    },
    async deleteReply(){
      let result = await this.$swal({
        title: "댓글을 삭제 하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      })
      if(result.isConfirmed){
        if(this.currentOptionClickItem != null){
          let qaBoardReplyUseCase = new QABoardReplyUseCase();
          await qaBoardReplyUseCase.delete(this.currentOptionClickItem.id)
          let findIndex =this.qaBoardReplyResDtos.findIndex(value => this.currentOptionClickItem?.id == value.id);
          this.qaBoardReplyResDtos.splice(findIndex,1)
          this.optionDialog = false;
        }
      }
    },
    qaReplyReport(){
      console.log("modifyReply")
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
.replyContentRow{
  display: flex;
}
.replyContent{
  flex-grow: 1;
}
.optionItem{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 51px;
  border-bottom: solid 1px gray;
  margin: 0px 16px;
  font-weight: bold;
  font-family: "Noto Sans KR";

}
.optionItem:last-child{
  border-bottom: unset;
}
.qaBadReplyReport {
  color: crimson;
}
</style>
