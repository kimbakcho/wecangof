<template>
  <div class="QA006Root">
    <div class="top">
      <TopBar title="글쓰기">

      </TopBar>
      <div class="divider">

      </div>
    </div>

    <div class="QA006Content">
      <QaCategoryCombo :qa-categorys="qaCategorys" class="qaCategorySelect" v-model="selectQaCategory">

      </QaCategoryCombo>
      <NationCombo :nations="nations" v-model="selectNation" class="nationsSelect" >

      </NationCombo>
      <div>
        제목
      </div>
      <v-text-field
          label="제목을 입력해주세요"
          outlined
          class="QA006titleInput"
          v-model="title"
      ></v-text-field>
      <div class="titleContent">
        <div>
          본문
        </div>
        <div>
          최대 5000자
        </div>
      </div>
      <v-textarea class="QA006contentTextArea" outlined height="350px" label="내용을 입력해주세요" v-model="contentText">

      </v-textarea>
      <div>
        <ImagePreviewUploader ref="imagePreViewUploader" class="imagePreViewUploader" v-for="item in attachImageKeys" :image-preview-obj="item" :key="item.key"
                              @change="imageUploadChange" @del="imageUploadDel">

        </ImagePreviewUploader>
      </div>

    </div>
    <div class="actionBtn" @click="save">
      글저장
    </div>

  </div>
</template>
<script lang="ts">
import Vue, {PropType, VueConstructor} from "vue"
import TopBar from "@/components/Common/TopBar.vue";
import {Route} from "vue-router";
import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";
import {QABoardCategoryUseCase} from "@/Bis/QABoardCategory/Domain/QABoardCategoryUseCase";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import NationControlUseCase from "@/Bis/NationControl/Domain/UseCase/NationControlUseCase";
import QaCategoryCombo from "@/components/QA/QaCategoryCombo.vue";
import NationCombo from "@/components/QA/NationCombo.vue";
import ImagePreviewUploader, {ImagePreviewUploaderType} from "@/components/QA/ImagePreviewUploader.vue";
import {ImagePreviewObj} from "@/components/QA/ImagePreviewObj";
import {QABoardUseCase} from "@/Bis/QABoard/Domain/UseCase/QABoardUseCase";
import FileUploadService from "@/Bis/Common/FileUploadService";
import {UploadFileResDto} from "@/Bis/Common/UploadFileResDto";
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";

export default (Vue as VueConstructor<Vue & {
  $refs:{
    imagePreViewUploader: ImagePreviewUploaderType[]
  }
}>).extend({
  components:{
    TopBar, QaCategoryCombo, NationCombo, ImagePreviewUploader
  },
  props:{
    qaBoardId:{
      type: String,
      required: false
    },
    qaBoardResDto:{
      type: Object as PropType<QABoardResDto>,
      required: false
    },
    qaCategorys: {
      type: Array as PropType<QABoardCategoryResDto[]>,
      required: true
    },
    nations: {
      type: Array as PropType<NationControlResDto[]>,
      required: true
    }
  },
  data(){
    return {
      selectQaCategory: {} as QABoardCategoryResDto | undefined,
      selectNation: {} as NationControlResDto | undefined,
      attachImageKeys:[] as ImagePreviewObj[],
      title: "",
      contentText: ""
    }
  },

  mounted(){
    if(this.getMode() == 'modify'){
      this.title = this.qaBoardResDto?.title
      const cateIndex =  this.qaCategorys.findIndex(x=>{
        return x.categoryName ==  this.qaBoardResDto?.classificationQuestions
      });

      if(cateIndex >= 0 ){
        this.selectQaCategory = this.qaCategorys[cateIndex]
      }
      const nationIndex  = this.nations.findIndex(x=>{
        return x.nationName == this.qaBoardResDto?.nationName?.nationName
      });

      if(nationIndex >= 0) {
        this.selectNation = this.nations[nationIndex]
      }
      this.contentText = this.qaBoardResDto?.contentText

      let contentImageUrls = JSON.parse(this.qaBoardResDto?.contentImageUrl) as UploadFileResDto[];

      contentImageUrls.forEach(x=>{
        this.attachImageKeys.push({
          key: x.fileName,
          preImageUrl: x.imageUrl
        })
      })

      this.attachImageKeys.push({
        key: this.uuidV4(),
        preImageUrl: null
      });
    }else {
      this.attachImageKeys.push({
        key: this.uuidV4(),
        preImageUrl: null
      });
    }
  },
  methods:{
    uuidV4(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    imageUploadChange(file: File){
      this.attachImageKeys.push({
        key: this.uuidV4(),
        preImageUrl: null
      });
    },
    imageUploadDel(item: ImagePreviewObj){
      let index = this.attachImageKeys.findIndex(x=>{
        return x.key == item.key
      });
      this.attachImageKeys.splice(index,1)
    },
    async save(){
      if(!this.selectQaCategory) {
        this.$swal("카테고리 선택이 필요합니다.")
        return ;
      }
      let qaBoardUseCase = new QABoardUseCase();
      let fileUploadService = new FileUploadService();
      let uploadFileResDtos: UploadFileResDto[] = []

      for(let i=0;i<this.$refs.imagePreViewUploader.length;i++) {
        let ipu = this.$refs.imagePreViewUploader[i];
        if(ipu.selectFile){
          if(ipu.selectFile.size > 0){
            let uploadFile = await fileUploadService.upload(this,ipu.selectFile);
            if(uploadFile){
              uploadFileResDtos.push(uploadFile);
            }
          }else {
            console.log("ipu.imagePreviewObj.preImageUrl")
            if(ipu.imagePreviewObj.preImageUrl){
              uploadFileResDtos.push({
                fileName: ipu.imagePreviewObj.key,
                imageUrl: ipu.imagePreviewObj.preImageUrl
              });
            }
          }
        }
      }
      if(this.getMode() == "write"){
        let qaBoardResDto = await qaBoardUseCase.insert({
          title: this.title,
          contentText: this.contentText,
          classificationQuestions: this.selectQaCategory.categoryName,
          nationName: this.selectNation?.nationName,
          contentImageUrl: JSON.stringify(uploadFileResDtos)
        });
        await this.$router.replace({
          path:`/QA003/${qaBoardResDto.id}`
        })
      }else {
        let qaBoardResDto = await qaBoardUseCase.update({
          id: Number(this.qaBoardId),
          title: this.title,
          contentText: this.contentText,
          classificationQuestions: this.selectQaCategory.categoryName,
          nationName: this.selectNation?.nationName,
          contentImageUrl: JSON.stringify(uploadFileResDtos)
        });
        await this.$router.replace({
          path:`/QA003/${qaBoardResDto.id}`
        })
      }
    },
    getMode(){
      if(this.qaBoardId){
        return "modify";
      }else {
        return "write";
      }
    }
  },

  async beforeRouteEnter(to: Route, from: Route, next: any) {

    let params: any = to.params;

    let qaBoardCategoryUseCase = new QABoardCategoryUseCase();

    params.qaCategorys = await qaBoardCategoryUseCase.getList();

    let nationControlUseCase = new NationControlUseCase();

    params.nations = await nationControlUseCase.getFilter({})

    if(params.qaBoardId){
      let qaBoardUseCase = new QABoardUseCase();
      params.qaBoardResDto = await qaBoardUseCase.getDoc(Number(params.qaBoardId));
    }

    next();

  }
})
</script>
<style scoped>
.qaCategorySelect{
  margin: 10px 0px;
}
.nationsSelect{
  margin: 10px 0px;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #e9ebf4;
}
.QA006Root{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.top{
  width: 100vw;
}
.QA006Content{
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px 25px 25px;
}
.actionBtn{
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #242424;
  color: white;
  font-family: "Noto Sans KR";
  font-size: 12px;
}
.QA006titleInput{
  margin-top: 10px;
}
.QA006contentTextArea{
  margin-top: 10px;
  border-radius: 10px;
}
.titleContent{
  display: flex;
  justify-content: space-between;
}
.titleContent div:nth-child(1){
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 13px;
  color: #242424;
}

.titleContent div:nth-child(2){
  font-family: "Noto Sans KR";
  font-weight: normal;
  font-size: 10px;
  color: #a7aab2;
}

.imagePreViewUploader {
  margin-bottom: 15px;
}
</style>

<style>
.QA006titleInput fieldset {
  border: 1px solid #e9ebf4;
}

.QA006contentTextArea fieldset {
  border: 1px solid #e9ebf4;

}

</style>
