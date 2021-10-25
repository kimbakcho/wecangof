<template>
  <div class="BC001Root">
    <div class="top">
      <top-bar :title=adminContentResDto.title>

      </top-bar>
    </div>
    <div class="BC001Content">
      <div id="contentViewer" class="contentViewer">
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue"
import {popupPlugin} from "@/toustuiplugin/popupPlugin";
import {innerLinkPlugin} from "@/toustuiplugin/innerLinkPlugin";
import "@/assets/common.css"
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import {DateTime} from "luxon";
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import {AdminContentResDto} from "@/Bis/AdminContent/Dto/AdminContentResDto";
import TopBar from "@/components/Common/TopBar.vue";
import {Route} from "vue-router";
import AdminContentUseCase from "@/Bis/AdminContent/Domain/UseCase/AdminContentUseCase";
export default Vue.extend({
  components:{
    TopBar
  },
  props:{
    docIdx:{
      type: String,
      required: true
    },
    adminContentResDto: {
      type: Object as PropType<AdminContentResDto>,
      required: true
    }
  },
  mounted() {

    let pluginOption = {
      context: this
    }

    new Viewer({
      el: document.querySelector('#contentViewer') as any,
      plugins: [[popupPlugin,pluginOption],[innerLinkPlugin,pluginOption]],
      initialValue: this.adminContentResDto.markDown,
    });
  },

  async beforeRouteEnter(to: Route, from: Route, next: any) {
    let adminContentUseCase = new AdminContentUseCase();
    let params: any = to.params;
    params.adminContentResDto = await adminContentUseCase.doc(params.docIdx);
    next();
  }

})
</script>
<style scoped>
.BC001Root{
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.BC001Content{
  flex-grow: 1;
  overflow-y: auto;
}
</style>
