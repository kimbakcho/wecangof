<template>
  <div>
    <input type="file" accept="image/*" :id="imagePreviewObj.key" class="imgInp" @change="change">
    <label :for="imagePreviewObj.key">
      <div class="emptyContainer" v-if="!previewImageMode">
        <v-icon color="#A7AAB2">
          wc-addimage
        </v-icon>
      </div>
      <div class="preViewImageContainer" ref="preViewImageDiv" v-if="previewImageMode" @click="delClick">
        <v-icon color="white">
          wc-imgdel
        </v-icon>
      </div>

    </label>

  </div>
</template>
<script lang="ts">
import Vue, {PropType, VueConstructor} from "vue"
import {ImagePreviewObj} from "@/components/QA/ImagePreviewObj";

const ImagePreviewUploader = (Vue as VueConstructor<Vue & {
  $refs: {
    preViewImageDiv: HTMLDivElement
  }
}>).extend({
  props: {
    imagePreviewObj: {
      type: Object as PropType<ImagePreviewObj>,
      required: true
    }
  },
  data() {
    return {
      previewImageMode: false,
      selectFile: null as File | null,
    }
  },
  mounted() {
    if(this.imagePreviewObj.preImageUrl){
      this.$refs.preViewImageDiv.style.backgroundImage = `url('${this.imagePreviewObj.preImageUrl}')`;
      this.$forceUpdate();
    }
  },
  methods: {
    async change(evt: any) {
      console.log(evt.target.files);
      if (evt.target.files && evt.target.files.length > 0) {
        this.selectFile = evt.target.files[0]
        this.previewImageMode = true
        this.$forceUpdate();
        await this.$nextTick();
        this.$refs.preViewImageDiv.style.backgroundImage = `url('${URL.createObjectURL(this.selectFile)}')`
        this.$emit("change",this.selectFile)
      }
    },
    delClick(evt: any) {
      console.log("del")
      evt.preventDefault()
      this.$emit("del", this.imagePreviewObj)
    },

  }
})
export type ImagePreviewUploaderType = InstanceType<typeof ImagePreviewUploader>;
export default ImagePreviewUploader;
</script>
<style scoped>
.emptyContainer {
  min-height: 200px;
  width: 100%;
  border-radius: 10px;
  border: 1px dashed #a7aab2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preViewImageContainer {
  min-height: 200px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center center;
  background-color: #242424;
  opacity: 0.5;
}

.imgInp {
  display: none;
}
</style>
