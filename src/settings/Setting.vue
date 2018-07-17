<template>
    <el-container>
        <el-header>
            <el-row align="top" justify="space-between">
                <el-col :xs="2" :sm="2" :md="1" :lg="1" :xl="1">
                    <icon class="exit-btn" name="arrow-left" scale="2" @click.native="$router.go(-1)"></icon>
                </el-col>
                <el-col :xs="22" :sm="22" :md="23" :lg="23" :xl="23">
                    <span>Contact</span>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .el-header {
    padding-top: 13px;
    font-size: 28px;
    background-color: #32393d;
    color: #fff;
  }
  .exit-btn {
    float: left;
    color: #1BBC9B;
    transition: all .30s ease;
    &:hover {
      color: #0be8ba;
      cursor: pointer;
    }
  }
</style>
