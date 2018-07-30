<template>
  <div class="forgot-password">
    <div class="top">
      <h1>Forgot Password</h1>
    </div>
    <div class="body">
      <div v-if="sendingCode" class="send-code">
        <el-row type="flex" justify="center">
          <p>Pick one of your attributes to verify your identity before resetting your password</p>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col>Send code to<br><span>{{ email }}</span></el-col>
          <el-col><el-button class="white-btn" type="primary" @click="sendAttrib(email)">Send</el-button></el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col>Send code to<br><span>{{ phone }}</span></el-col>
          <el-col><el-button class="white-btn" type="primary" @click="sendAttrib(phone)">Send</el-button></el-col>
        </el-row>
      </div>
      <div v-else class="verify-code">
        <el-row type="flex" justify="center">
          <el-col>We sent a code to <span>{{ attribSent }}</span><br><br>Enter the code below to verify</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col><input ref="code" type="text" placeholder="CODE" required></el-col>
        </el-row>
        <el-button class="white-btn" type="primary" @click="verifyCode">Verify</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      sendingCode: true,
      attribSent: ''
    }
  },
  computed: {
    ...mapGetters({
      signInData: 'getSignInData'
    }),
    email () {
      return this.signInData.email
    },
    phone () {
      return this.signInData.phone
    }
  },
  methods: {
    ...mapActions([
      'sendVerify',
      'verify'
    ]),
    sendAttrib (attrib) {
      this.attribSent = attrib
      this.sendVerify(attrib)
        .then(() => {
          this.sendingCode = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    verifyCode () {
      // Check if field has been filled out and change style w/ popup if not
      // Otherwise get input from field and make API call to check entered code
      // this.verify(code)
    }
  }
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
