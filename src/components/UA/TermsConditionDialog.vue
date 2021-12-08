<template>
  <v-dialog v-model="dialog" max-width="80%" content-class="termDialogRoot">
    <div class="TermsConditionDialogTitle">
      {{ title }}
    </div>

    <div class="BC001Content content">
      <div :id="viwerId" class="contentViewer">
      </div>
    </div>

    <div class="actions">
      <v-btn  class="actionsBtn" @click="onAgreement" color="#006fff">
        동의
      </v-btn>
      <v-btn class="actionsBtn" @click="onDeny" color="grey">
        거부
      </v-btn>
    </div>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue"
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import {popupPlugin} from "@/toustuiplugin/popupPlugin";
import {innerLinkPlugin} from "@/toustuiplugin/innerLinkPlugin";
import AdminContentUseCase from "@/Bis/AdminContent/Domain/UseCase/AdminContentUseCase";
const TermsConditionDialog = Vue.extend({
  data(){
    return{
      dialog: false,
      title: "",
      docNumber: 7,
      viwerId: ""

    }
  },

  methods:{
    getContentId(){
      return
    },

    async open(title: string,docNumber: number){
      this.docNumber = docNumber;
      this.viwerId = `contentViewer${this.docNumber}`
      this.$forceUpdate()
      await this.$nextTick();
      this.dialog = true;
      let pluginOption = {
        context: this
      }
      this.title = title;
      let adminContentUseCase = new AdminContentUseCase();
      let adminContentResDto = await adminContentUseCase.doc(docNumber);
      new Viewer({
        el: document.querySelector(`#${this.viwerId}`) as any,
        plugins: [[popupPlugin,pluginOption],[innerLinkPlugin,pluginOption]],
        initialValue: adminContentResDto.markDown,
      });
    },
    onAgreement(){
      this.$emit("agreement")
      this.dialog = false;
    },
    onDeny(){
      this.$emit("deny")
      this.dialog = false;
    }
  },
})
export default TermsConditionDialog;
export type TermsConditionDialogType = InstanceType<typeof TermsConditionDialog>
</script>
<style scoped>
.content{
  overflow: auto;
  flex-grow: 1;
  padding: 16px;
}
.actions{
  display: flex;
  align-items: center;
}
.actionsBtn{
  flex-grow: 1;
  margin: 0px 16px;
}
.TermsConditionDialogTitle{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
</style>
<style>
.termDialogRoot {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
}
</style>
