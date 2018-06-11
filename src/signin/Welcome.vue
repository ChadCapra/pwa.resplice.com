<template>
  <div>
    <div class="top">
      <h1>Hello!</h1>
      <h2>Welcome to Resplice</h2>
    </div>
    <div class="body">
      <p style="font-size: 24px;">Please add your information so you can share it with your friends and family:</p>
      <form action="">
        <el-row type="flex" justify="center" class="form-item">
          <el-col :xs="4" :sm="4" :md="2" :xl="1"><icon name="phone" scale="2.5"></icon></el-col>
          <el-col :xs="14" :sm="10" :md="8" :xl="6"><input type="text" placeholder="Phone" class="input"></el-col>
          <el-col :xs="4" :sm="4" :md="2" :xl="1" @click="addAttribute(1)"><icon name="plus" scale="2.5"></icon></el-col>
        </el-row>
        <el-row type="flex" justify="center" class="form-item">
          <el-col :xs="4" :sm="4" :md="2" :xl="1"><icon name="envelope" scale="2.5"></icon></el-col>
          <el-col :xs="14" :sm="10" :md="8" :xl="6"><input type="text" placeholder="Email" class="input"></el-col>
          <el-col :xs="4" :sm="4" :md="2" :xl="1" @click="addAttribute(2)"><icon name="plus" scale="2.5"></icon></el-col>
        </el-row>
        <el-row type="flex" justify="center" class="form-item">
          <el-col :xs="4" :sm="4" :md="2" :xl="1"><icon name="home" scale="2.5"></icon></el-col>
          <el-col :xs="14" :sm="10" :md="8" :xl="6"><input type="text" placeholder="Address" class="input"></el-col>
          <el-col :xs="4" :sm="4" :md="2" :xl="1" @click="addAttribute(3)"><icon name="plus" scale="2.5"></icon></el-col>
        </el-row>
        <el-row type="flex" justify="center" class="form-item">
          <el-col :xs="4" :sm="4" :md="2" :xl="1"><icon name="globe" scale="2.5"></icon></el-col>
          <el-col :xs="14" :sm="10" :md="8" :xl="6"><input type="text" placeholder="Website" class="input"></el-col>
          <el-col :xs="4" :sm="4" :md="2" :xl="1" @click="addAttribute(4)"><icon name="plus" scale="2.5"></icon></el-col>
        </el-row>
        <el-row type="flex" class="form-item">
          <el-col :xs="4" :sm="4" :md="2" :xl="1"><icon name="sort-down" scale="2.5"></icon> More</el-col>
        </el-row>
        <el-button class="sub-btn" type="primary">Submit</el-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      attribute: {
        type: '',
        value: ''
      },
      attributes: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    color: #1BBC9B;
    background-color: #fff;
  }
  .body {
    color: white;
    padding: 5px;
    background-color: #1BBC9B;
    height: calc(100vh - 173px);
    height: -o-calc(100vh - 173px);
    height: -webkit-calc(100vh - 173px);
    height: -moz-calc(100vh - 173px);
  }
  h1 {
    font-size: 96px;
    margin: 0;
  }
  h2 {
    font-size: 36px;
    margin: 5px;
  }
  .sub-btn {
    background-color: #fff;
    color: #1BBC9B;
    position: fixed;
    bottom: 15px;
    right: 15px;
  }
  .form-item {
    margin-bottom: 30px;
  }
  .input {
    outline: 0;
    border: 0;
    height: 80%;
    width: 100%;
    background: transparent;
    border-bottom: 2px solid #fff;
    color: #fff;
    font-size: 16px;
  }
</style>
