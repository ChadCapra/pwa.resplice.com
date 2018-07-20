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
    color: #FFFFFF;
    background-color: #1BBC98;
    & h1 {
        margin: 0;
    }
  }
  el-row {
    display: flex;
    align-items: center;
  }
  .exit-btn {
    float: left;
    color: #FFFFFF;
    transition: all .30s ease;
    margin-left: 10px;
    &:hover {
      color: #32393D;
      cursor: pointer;
    }
  }
</style>
