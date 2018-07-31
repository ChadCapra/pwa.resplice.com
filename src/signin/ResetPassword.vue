<template>
  <div class="reset-password">
    <div class="top">
      <h1>Reset Password</h1>
    </div>
    <div class="body">
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="signin-input-title">New Password</h3>
          <input type="password" placeholder="Enter New Password" class="signin-input" v-model="newPasswords.password" required>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="signin-input-title">Confirm New Password</h3>
          <input type="password" placeholder="Confirm New Password" class="signin-input" v-model="newPasswords.password_confirmation" required>
        </el-col>
      </el-row>
      <el-button class="white-btn" @click="resetPassword" type="primary">Reset Password</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newPasswords: {
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    resetPassword () {
      console.log('Resetting Password')
    }
  }
}
</script>

<style lang="scss" scoped>
  .reset-password {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .reset-password > * {
    flex-shrink: 0;
  }
  .top {
    color: #1BBC98;
    background-color: white;
    & h1 {
      font-size: 64px;
      margin: 10px 0;
    }
  }
  .body {
    color: white;
    padding: 5px;
    background-color: #1BBC9B;
    flex-grow: 1;
    padding-bottom: 60px;
  }
  .el-row {
    margin: 75px 0;
    & span {
      font-weight: bold;
    }
  }
</style>
