<template>
  <div class="attrib-verification">
    <div class="top">
      <h1>Verification</h1>
    </div>
    <div class="body">
      <div class="verify-code">
        <el-row type="flex" justify="center">
          <el-col>We sent a code to <span>{{ userPhone }}</span><br>Enter the code below to verify</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col><input v-model="codes.phone" ref="code" type="text" placeholder="CODE" required></el-col>
        </el-row>
      </div>
      <div class="verify-code">
        <el-row type="flex" justify="center">
          <el-col>We sent a code to <span>{{ userEmail }}</span><br>Enter the code below to verify</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col><input v-model="codes.email" ref="code" type="text" placeholder="CODE" required></el-col>
        </el-row>
      </div>
      <el-button class="white-btn" type="primary" @click="verifyCodes">Verify</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      codes: {
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      userAttributes: 'getUserAttributes'
    }),
    userPhone () {
      return this.userAttributes[0].value
    },
    userEmail () {
      return this.userAttributes[1].value
    }
  },
  methods: {
    ...mapActions([
      'verify'
    ]),
    verifyCodes () {
      const phoneCode = this.codes.phone.toUpperCase()
      const emailCode = this.codes.email.toUpperCase()
      this.verify({ verification_tokens: { token_list: [phoneCode, emailCode] } })
        .then(() => {
          console.log('Successfully Verified Attributes')
          this.$router.push({name: 'root'})
        })
        .catch(error => {
          console.log('Error Validating Attributes, double check your codes', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .attrib-verification {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .attrib-verification > * {
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
  .verify-code {
    margin: 75px 0;
    & .el-row {
      & span {
        font-weight: bold;
      }
    }
    & input {
      margin-top: 25px;
    }
  }
</style>

