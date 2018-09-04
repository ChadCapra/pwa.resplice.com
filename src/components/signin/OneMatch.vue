<template>
  <div class="one-match">
    <div class="top">
      <h1>Only one of the attributes matched an account on resplice</h1>
    </div>
    <div class="body">
      <div class="try-again">
        <p>Maybe you signed up with a different email or phone number? Click below to try again</p>
        <el-button type="primary" class="white-btn" @click="$router.push({name: 'Signin'})">Go Back and Try Again</el-button>
      </div>
      <div class="sign-up">
        <p>Or you can create a new account with these attributes:<br>{{ signInData.email }} | {{ signInData.phone}}</p>
        <el-button type="primary" class="white-btn" @click="$router.push({name: 'SignUp'})">Create New Account</el-button>
      </div>
      <div class="contact-us">
        <p>If you need to recover this account, please contact us at the <a href="mailto:support@resplice.com">support@resplice.com</a> or click the button below</p>
        <el-button type="primary" class="white-btn" @click="href='https://resplice.com'">Contact Us</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      signInData: 'getSignInData'
    }),
    href: {
      get () {
        return window.location.href
      },
      set (value) {
        window.location.href = value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .one-match {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .one-match > * {
    flex-shrink: 0;
  }
  .top {
    color: #1BBC98;
    background-color: white;
    & h1 {
      font-size: 36px;
      margin: 10px 0;
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: white;
    padding: 5px;
    background-color: #1BBC9B;
    flex-grow: 1;
    padding-bottom: 60px;
    & .el-button {
      width: 80%;
      max-width: 350px;
    }
  }
  .contact-us {
    & a {
      color: white;
    }
  }
</style>