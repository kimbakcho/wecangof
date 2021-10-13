<template>
  <div>
    <div :id="`editor${immigrationInfoManagementId}`"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import {Editor, EditorCore} from "@toast-ui/editor";
import {popupPlugin} from "@/toustuiplugin/popupPlugin";
import {innerLinkPlugin} from "@/toustuiplugin/innerLinkPlugin";
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

import FileUploadService from "@/Bis/Common/FileUploadService";
import ImmigrationInfoManagementUseCase from "@/Bis/ImmigrationStatus/Domain/UseCase/ImmigrationInfoManagementUseCase";
import {ImmigrationInfoManagementUpdateReqDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationInfoManagementUpdateReqDto";
const NationInfoEditor =  Vue.extend({
  props:{
    immigrationInfoManagementId:{
      type: Number,
      required: true
    }
  },
  data(){
    return {
      editor: {} as EditorCore
    }
  },
  async mounted() {
    let pluginOption = {
      context: this
    }

    let immigrationInfoManagementUseCase = new ImmigrationInfoManagementUseCase();

    let managementResDto = await immigrationInfoManagementUseCase.getDoc(this.immigrationInfoManagementId);

    this.editor = new Editor({
      el: document.querySelector(`#editor${this.immigrationInfoManagementId}`) as any,
      height: '500px',
      initialEditType: 'markdown',
      initialValue: managementResDto.contentMarkDown,
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
    async update(): Promise<void>{
      let immigrationInfoManagementUseCase = new ImmigrationInfoManagementUseCase();
      let updateReqDto: ImmigrationInfoManagementUpdateReqDto= {
        id: this.immigrationInfoManagementId,
        markDown:  this.editor.getMarkdown(),
        html: this.editor.getHTML()
      }
      await immigrationInfoManagementUseCase.update(updateReqDto)
    }
  }
})
export type NationInfoEditorType = InstanceType<typeof NationInfoEditor>
export default NationInfoEditor;
</script>
<style scoped>

</style>
