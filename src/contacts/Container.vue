<template>
<!-- Contacts Parent Component -->
<el-container class="contacts">
  <el-header>
    <re-header>
      <template slot="headerContent">
        <span class="header-content">
          <slot name="header">Resplice</slot>
        </span>
      </template>
    </re-header>
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
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  components: {
    'reHeader': Header,
    'reFooter': Footer
  },
  methods: {
  }
}
</script>

<style scoped>
  .el-header {
    padding-top: 10px;
    background-color: #32393d;
  }
  .header-content {
    margin-bottom: 10px;
    color: #fff;
    font-size: 28px;
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