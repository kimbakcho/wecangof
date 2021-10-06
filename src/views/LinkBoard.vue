<template>
  <div class="linkBoard">
    <div>
      <v-btn @click="back">
        뒤로가기
      </v-btn>
    </div>
    <iframe width="100%" height="100%" :src="linkUrl"></iframe>
  </div>
</template>

<script lang="ts">
import Vue,{PropType} from "vue"
export default Vue.extend({
  props:{
    linkUrl:{
      type: String
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
})
</script>

<style scoped>
.linkBoard{
  z-index: 100;
}
</style>