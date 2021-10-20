<template>
  <div>
    <div class="row" v-for="(item,index) in items" :key="index" @click="itemClick(item)">
      <div v-if="isAdmin" @click="setRepresentative($event,item)">
        우선 순위 {{ item.representative }}
      </div>
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
      <div class="replyInfo">
        <div class="replyCount">
          <v-icon color="#2661F1" size="15">
            wc-replya
          </v-icon>
          <div>
            {{ item.replyCount }}
          </div>
        </div>
        <div class="replyText">
          {{ getReplyText(item) }}
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import WCTimeUtil from "@/Bis/Common/WCTimeUtil";
import {DateTime} from "luxon";
import UserProfile from "@/components/Common/UserProfile.vue";
import {QABoardComResDto} from "@/Bis/QABoard/Dto/QABoardComResDto";
import {QABoardReplyResDto} from "@/Bis/QABoardReply/Dto/QABoardReplyResDto";
import {QABoardUseCase} from "@/Bis/QABoard/Domain/UseCase/QABoardUseCase";

export default Vue.extend({
  components: {
    UserProfile,
  },
  props: {
    items: {
      type: Array as PropType<QABoardComResDto[]>,
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
  methods: {
    getUploadTimeText(isoValue: string) {
      return WCTimeUtil.timeForToday(DateTime.fromISO(isoValue).toJSDate());
    },
    async setRepresentative(event: any,item: QABoardComResDto ){
      if (event.stopPropagation)
        event.stopPropagation();

      event.preventDefault()
      let orderIndex: any = ""
      let result: any = await this.$swal(
          {
            title: '우선순위 변경',
            input: 'number',
          }
      );
      if(result.value.length > 0) {
        let qaBoardUseCase = new QABoardUseCase();
        await qaBoardUseCase.changeRepresentative(item.id,Number(result.value));
        item.representative = Number(result.value);
        this.$forceUpdate()
      }

    },
    getReplyText(item: QABoardComResDto){
      if(item.qaBoardReplyResDto){
        return item.qaBoardReplyResDto.content
      }else {
        return ""
      }
    },
    itemClick(item: QABoardComResDto){
      this.$router.push({
        path: `/QA003/${item.id}`
      })
    }
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

.replyInfo{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.replyInfo .replyCount {
  display: flex;
  align-items: end;
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 15px;
  color: #2661f1;
}
.replyInfo{
  margin-top: 30px;
}
.replyInfo .replyText {
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 12px;
  color: #2661f1;
  margin-left: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
