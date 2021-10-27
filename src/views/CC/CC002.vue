<template>
  <div>
      <h3 class="CC002Title">
        작성하기
      </h3>
    <div class="options">
      <v-select label="카테고리" :items="categoryItems" clearable class="categorySelect" v-model="category">

      </v-select>
      <v-text-field type="number" label="우선 순위" v-model="orderIdx" class="orderIndex">

      </v-text-field>
    </div>
    <v-text-field label="제목" v-model="title" class="DocTitle">

    </v-text-field>
    <div id="editor">

    </div>
    <div class="actions">
      <v-btn @click="save" :loading="loading">
        저장
      </v-btn>
    </div>



  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {Editor, EditorCore} from "@toast-ui/editor";
import {popupPlugin} from "@/toustuiplugin/popupPlugin";
import {innerLinkPlugin} from "@/toustuiplugin/innerLinkPlugin";
import "@/assets/common.css"
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import FileUploadService from "@/Bis/Common/FileUploadService";
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import AdminContentUseCase from "@/Bis/AdminContent/Domain/UseCase/AdminContentUseCase";

export default Vue.extend({

  props:{
    docNumber: {
      type: String,
    }
  },
  data(){
    return {
      editor: {} as EditorCore,
      title: "",
      loading: false,
      categoryItems: ["메인 공지","Q&A 공지","세부 공지"],
      category: "",
      orderIdx: 0,
    }
  },
  computed:{
    mode(): string{
      if(Number(this.docNumber) == -1){
        return "create"
      }else {
        return "modify"
      }
    }
  },
  async mounted() {
    let pluginOption = {
      context: this
    }
    let initValue = ""
    let adminContentUseCase = new AdminContentUseCase();
    if(this.mode == 'modify'){
      let adminContentResDto = await adminContentUseCase.doc(Number(this.docNumber));
      initValue = adminContentResDto.markDown;
      this.title = adminContentResDto.title;
      this.category = adminContentResDto.category;
      this.orderIdx = Number(adminContentResDto.orderIdx);
      console.log(adminContentResDto)
    }
    this.editor = new Editor({
      el: document.querySelector("#editor") as any,
      height: '500px',
      initialEditType: 'markdown',
      initialValue: initValue,
      previewStyle: 'vertical',
      plugins: [[popupPlugin,pluginOption],[innerLinkPlugin,pluginOption],colorSyntax,tableMergedCell],
      hooks: {
        addImageBlobHook: async (blob, callback) => {
          let formData = new FormData();
          formData.append("file", blob);

          let fileUploadService = new FileUploadService();

          let resDto = await fileUploadService.upload(this,blob);

          if(resDto){
            callback(resDto.imageUrl,"alt text")
          }
          return false;
        }
      }
    })

  },
  methods:{

    async save(){
      this.loading = true;
      let adminContentUseCase = new AdminContentUseCase();
      if(this.mode == 'create'){
        await adminContentUseCase.save({
          title: this.title,
          markDown:  this.editor.getMarkdown(),
          html: this.editor.getHTML(),
          category: this.category,
          orderIdx: this.orderIdx
        });
      }else {
        await adminContentUseCase.update({
          id: Number(this.docNumber),
          title: this.title,
          markDown:  this.editor.getMarkdown(),
          html: this.editor.getHTML(),
          category: this.category,
          orderIdx: this.orderIdx
        });
      }
      this.loading = false;
      await this.$router.back()


    }
  }
})
</script>
<style scoped>
.CC002Title{
  padding: 25px;
}
.actions {
  padding: 25px;
  display: flex;
  justify-content: end;
}
.DocTitle{
  padding: 25px;
}
.options{
  display: flex;
  margin-left: 25px;
}
.categorySelect{
  max-width: 200px;
}
.orderIndex{
  max-width: 200px;
  margin-left: 20px;
}
</style>
