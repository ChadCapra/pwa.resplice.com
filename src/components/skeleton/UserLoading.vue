<template>
<div class="profile">
    <el-row class="pic-uploader">
      <div class="profile-pic">
        <div class="pic-placeholder"></div>
      </div>
    </el-row>
    <el-row>
      <el-card></el-card>
      <el-card></el-card>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  .pic-uploader {
    height: 210px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .el-card {
    height: 240px;
    margin-bottom: 20px;
    background: linear-gradient(271deg, #b4b7b6, #999999);
    background-size: 400% 400%;

    -webkit-animation: skeleton 1.5s ease infinite;
    -moz-animation: skeleton 1.5s ease infinite;
    animation: skeleton 1.5s ease infinite;

    @-webkit-keyframes skeleton {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    }
    @-moz-keyframes skeleton {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    }
    @keyframes skeleton { 
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    }
  }
</style>

