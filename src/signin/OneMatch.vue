<template>
  <div class="one-match">
    <div class="top">
      <h1>Only one of the attributes matched an account on resplice</h1>
    </div>
    <div class="body">
      <div v-if="sendingCode" class="send-code">
        <el-row type="flex" justify="center">
          <el-col>Send code to<br>{{ email }}</el-col>
          <el-col><el-button class="white-btn" type="primary" @click="sendAttrib(email)">Send</el-button></el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col>Send code to<br>{{ phone }}</el-col>
          <el-col><el-button class="white-btn" type="primary" @click="sendAttrib(phone)">Send</el-button></el-col>
        </el-row>
      </div>
      <div v-else class="verify-code">
        <el-row type="flex" justify="center">
          <el-col>We sent a code to {{ attribSent }}<br>Enter the code below to verify</el-col>
          <el-col><input ref="code" type="text" placeholder="CODE" required></el-col>
        </el-row>
        <el-button class="white-btn" type="primary" @click="verifyCode"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .forgot-password {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .forgot-password > * {
    flex-shrink: 0;
  }
  .top {
    color: #1BBC98;
    background-color: white;
    & h1 {
      font-size: 36px;
      margin: 0;
    }
  }
  .body {
    color: white;
    padding: 5px;
    background-color: #1BBC9B;
    flex-grow: 1;
    padding-bottom: 60px;
  }
</style>