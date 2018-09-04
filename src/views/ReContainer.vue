<template>
<!-- Contacts Parent Component -->
<el-container class="contacts">
  <el-header v-if="showHeader">
    <re-header></re-header>
  </el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
  <el-footer>
    <re-footer></re-footer>
  </el-footer>
</el-container>
</template>

<script>
import ReHeader from '@/components/contacts/ReHeader.vue'
import ReFooter from '@/components/contacts/ReFooter.vue'

export default {
  components: {
    'reHeader': ReHeader,
    'reFooter': ReFooter
  },
  computed: {
    showHeader () {
      return this.$store.getters.getShowHeader
    }
  }
}
</script>

<style scoped>
  .el-header {
    padding-top: 13px;
    background-color: #32393D;
    /* display: flex;
    align-items: center; */
  }
  .el-footer {
    background-color: #32393D;
    padding-left: 5px;
    padding-right: 5px;
  }
  .contacts {
    text-align: center;
  }
</style>