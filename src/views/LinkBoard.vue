<template>
  <div class="linkBoard">
    <TopBar >

    </TopBar>
    <iframe width="100%" height="100%" :src="linkUrl"></iframe>
  </div>
</template>

<script lang="ts">
import Vue,{PropType} from "vue"
import TopBar from "@/components/Common/TopBar.vue";
export default Vue.extend({
  components:{
    TopBar
  },
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
