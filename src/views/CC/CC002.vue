<template>
  <div>
      <h3 class="CC002Title">
        작성하기
      </h3>
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
      type: Number,
    }
  },
  data(){
    return {
      editor: {} as EditorCore,
      title: "",
      loading: false
    }
  },
  computed:{
    mode(): string{
      if(this.docNumber == -1){
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
      let adminContentResDto = await adminContentUseCase.doc(this.docNumber);
      initValue = adminContentResDto.markDown;
      this.title = adminContentResDto.title;
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
          html: this.editor.getHTML()
        });
      }else {
        await adminContentUseCase.update({
          id: this.docNumber,
          title: this.title,
          markDown:  this.editor.getMarkdown(),
          html: this.editor.getHTML()
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
</style>
