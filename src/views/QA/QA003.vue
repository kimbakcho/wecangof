<template>
  <div class="QA003Root">
    <TopBar title=""> </TopBar>
    <div class="QA003Content">
      <div class="titleBar">
        <div class="title">
          {{ qaBoardResDto.title }}
        </div>
        <div class="optionBtn" @click="optionBtn">
          <v-icon size="20">
            fas fa-ellipsis-v
          </v-icon>
        </div>
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
      <div class="imageContent" v-viewer>
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
    <v-bottom-sheet v-model="optionDialog" max-width="80%"  inset content-class="QA003optionSheet">
      <v-sheet class="QA003optionSheet">
        <div @click="modifyDoc" class="optionItem" v-if="isMyDoc()">
          수정하기
        </div>
        <div @click="deleteDoc" class="optionItem" v-if="isMyDoc()">
          삭제하기
        </div>
        <div @click="qaBadReport" class="optionItem qaBadReport" v-if="canBadReport()" >
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
import 'viewerjs/dist/viewer.css'
import {MutationTypes} from "@/store/mutations";
import QABadReportUseCase from "@/Bis/QABadReport/Domain/UseCase/QABadReportUseCase";
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
      insertReplyText: "",
      optionDialog: false
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
    getImages(): string[]{
      let images = this.getImageMeta().map(x=>{
        return x.imageUrl
      });
      return images;
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
    },
    optionBtn(){
      this.optionDialog = true;
    },
    async deleteDoc(){
      let qaBoardUseCase = new QABoardUseCase();
      await qaBoardUseCase.deleteDoc(Number(this.qaBoardId));
      this.$router.back();
    },
    modifyDoc(){
      this.$router.push({
        path: `/QA006/${this.qaBoardId}`
      })
    },
    isMyDoc(): boolean{
      if(this.$store.state.isLogin){
        if(this.qaBoardResDto.writer.uid == this.$store.state.userInfo.uid){
          return true;
        }else if(this.$store.state.userInfo.role.indexOf("Admin")>=0){
          return true;
        }
      }
      return false;
    },
    canBadReport(){
      if(!this.$store.state.isLogin){
        return true;
      }else {
        if(this.$store.state.userInfo.uid != this.qaBoardResDto.writer.uid) {
          return true;
        }
      }
      return false;

    },
    async qaBadReport() {
      if(!this.$store.state.isLogin){
        this.$swal("로그인이 필요 합니다.")
      }else {
        let qaBadReportUseCase = new QABadReportUseCase();
        await qaBadReportUseCase.report({
          qaDodId: this.qaBoardResDto.id
        })
        await this.$swal("신고 처리 되었습니다. 운영진 검토후 처리 하겠습니다.");
        this.optionDialog = false;

      }

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
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
}

.titleBar{
  display: flex;
  align-items: start;
  padding: 0px 25px;
}
.titleBar .title{
  flex-grow: 1;
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

}
.optionBtn{
  margin-left: 20px;
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
  object-fit: cover;
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
.qaBadReport {
  color: crimson;
}
</style>
<style>
.replyWriter fieldset{
  border: unset !important;
}
.QA003optionSheet {
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;;
}
</style>
