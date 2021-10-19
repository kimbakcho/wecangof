<template>
  <div class="QA003Root">
    <TopBar title=""> </TopBar>
    <div class="QA003Content">
      <div class="title">
        {{ qaBoardResDto.title }}
      </div>
      <div class="info1">
        <div> {{ qaBoardResDto.classificationQuestions }} </div>
        <UserProfile :user-info="qaBoardResDto.writer"> </UserProfile>
      </div>
      <div class="info2">
        <div class="view item">
          <v-icon color="#A7AAB2" size="13">
            wc-view
          </v-icon>
          <div class="text">
            {{ qaBoardResDto.view }}
          </div>
        </div>
        <div class="reply item">
          <v-icon color="#A7AAB2" size="13">
            wc-reply
          </v-icon>
          <div class="text">
            {{ qaBoardResDto.replyCount }}
          </div>
        </div>
        <div class="time item">
          {{ getWriteTimeText() }}
        </div>
      </div>
      <div class="content">
        <div class="contentText" v-html="getContentText()">

        </div>
      </div>
      <div class="imageContent">
        <img v-for="(item,index) in getImageMeta()" :src="item.imageUrl" :key="index">
      </div>
      <div class="replyCount">
        {{ `댓글 ${qaBoardResDto.replyCount}` }}
      </div>
      <ReplyComponent ref="ReplyComponent" :qa-board-reply-res-dtos="qaBoardReplys" :key="qaBoardReplys.length">

      </ReplyComponent>

    </div>
    <div class="replyWriter">
      <v-textarea auto-grow placeholder="댓글 내용을 입력해 주세요" rows="1" outlined dense hide-details v-model="insertReplyText">

      </v-textarea>
      <button class="replySendBtn" @click="insertReply">
        보내기
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType, VueConstructor} from "vue"
import TopBar from "@/components/Common/TopBar.vue";
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";
import {Route} from "vue-router";
import {QABoardUseCase} from "@/Bis/QABoard/Domain/UseCase/QABoardUseCase";
import UserProfile from "@/components/Common/UserProfile.vue";
import {DateTime} from "luxon";
import WCTimeUtil from "@/Bis/Common/WCTimeUtil";
import {UploadFileResDto} from "@/Bis/Common/UploadFileResDto";
import QABoardReplyUseCase from "@/Bis/QABoardReply/Domain/UseCase/QABoardReplyUseCase";
import ReplyComponent, {ReplyComponentRootType} from "@/components/Reply/ReplyComponent.vue";
import {QABoardReplyResDto} from "@/Bis/QABoardReply/Dto/QABoardReplyResDto";

export default (Vue as VueConstructor<Vue & {
  $refs:{
    ReplyComponent: ReplyComponentRootType
  }
}>).extend({
  components:{
    TopBar, UserProfile, ReplyComponent
  },
  props:{
    qaBoardId:{
      type: String,
      required: true
    },
    qaBoardResDto: {
      type: Object as PropType<QABoardResDto>,
      required: true
    },
    qaBoardReplys: {
      type: Array as PropType<QABoardReplyResDto[]>,
      required: true
    }
  },
  data(){
    return {
      insertReplyText: ""
    }
  },
  methods:{
    getWriteTimeText(){
      let dateTime = DateTime.fromISO(this.qaBoardResDto.updateDateTime);
      return WCTimeUtil.timeForToday(dateTime.toJSDate());
    },
    getContentText(){
      return this.qaBoardResDto.contentText.replace(/\n/g, '<br/>')
    },
    getImageMeta(): UploadFileResDto[]{
      return JSON.parse(this.qaBoardResDto.contentImageUrl);
    },
    async insertReply(){
      if(!this.insertReplyText){
        this.$swal("입력이 없습니다.")
        return ;
      }
      let qaBoardReplyUseCase = new QABoardReplyUseCase();
      let resDto = await qaBoardReplyUseCase.insert({
        content: this.insertReplyText,
        nationName: this.qaBoardResDto.nationName?.nationName,
        qaBoardCategory: this.qaBoardResDto.classificationQuestions,
        qaBoardId: this.qaBoardResDto.id,
      })
      this.insertReplyText = '';
      this.qaBoardReplys.push(resDto);
      this.qaBoardResDto.replyCount++;
      await this.$nextTick();
      this.$refs.ReplyComponent.getLastReplyDom().scrollIntoView();
    }
  },
  async beforeRouteEnter(to: Route, from: Route, next: any) {
    let qaBoardUseCase = new QABoardUseCase();
    let params: any = to.params;
    await qaBoardUseCase.updateViewCount(params.qaBoardId);
    params.qaBoardResDto = await qaBoardUseCase.getDoc(params.qaBoardId);
    let qaBoardReplyUseCase = new QABoardReplyUseCase();
    params.qaBoardReplys = await qaBoardReplyUseCase.getQaDocReplys(params.qaBoardId);
    next()
  }

})
</script>
<style scoped>
.QA003Root{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.QA003Content{
  flex-grow: 1;
  overflow-y: auto;
}
.QA003Content::-webkit-scrollbar{
  display: none;
}
.QA003Content .title{
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  color: #2f2f2f;
  padding: 15px 25px;
}

.info1 {
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
}
.info1 div:nth-child(1){
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 12px;
  color: #215df1;

}
.info2 {
  padding: 15px 25px;
  display: flex;
}
.info2 .text{
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 10px;
  color: #a7aab2;
  margin-left: 9px;
}
.info2 .item{
  display: flex;

  align-items: center;
}
.info2 .reply{
  margin-left: 21px;
}
.info2 .time {
  margin-left: auto;
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 10px;
  color: #a7aab2;
}
.QA003Content .content{
  margin: 25px;
  padding: 25px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e9ebf4;
}
.imageContent{
  padding: 23px;
}
.imageContent img{
  width: 100%;
  height: 200px;
  object-fit: fill;
  border-radius: 10px;
  margin-bottom: 10px;
}
.replyWriter{
  background: #e9ebf4;
  display: flex;
  width: 100vw;
}
.replySendBtn{
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 15px;
  color: #215df1;
  margin-right: 23px;
}
.replyCount{
  padding: 15px 25px;
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 15px;
  color: #2f2f2f;
}
</style>
<style>
.replyWriter fieldset{
  border: unset !important;
}
</style>
