<template>
  <div class="sign-up">
    <div class="top">
      <h1>Sign Up</h1>
      <h2>Enter name, email, phone &amp; password</h2>
    </div>
    <div class="body">
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="signin-input-title">Email Address</h3>
          <input type="email" placeholder="your@email.com" class="signin-input" v-model="signUp.email" required>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="signin-input-title">Phone Number</h3>
          <input type="tel" placeholder="(999) 999-9999" pattern="[0-9]" class="signin-input" v-model="signUp.phone" v-mask="'(###) ###-####'" required>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="signin-input-title">Full Name</h3>
          <input type="text" placeholder="Han Solo" class="signin-input" v-model="signUp.name" required autofocus>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="signin-input-title">Password</h3>
          <input type="password" placeholder="Password" class="signin-input" v-model="signUp.password" required>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="signin-input-title">Confirm Password</h3>
          <input type="password" placeholder="Confirm Password" class="signin-input" v-model="signUp.password_confirmation" required>
        </el-col>
      </el-row>
      <el-button v-loading="loading" class="white-btn" @click="submit" type="primary">Sign Up</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signUp: {
        email: '',
        phone: '',
        name: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    loading: {
      get () {
        return this.$store.getters.getGlobalLoading
      },
      set (value) {
        this.$store.commit('setGlobalLoading', value)
      }
    }
  },
  methods: {
    submit () {
      var passwordConfirmed = this.passwordConfirmation()
      if (passwordConfirmed === 1) {
        console.log('Passwords do not match')
      } else {
        this.loading = true
        this.$store.dispatch('signUp', this.signUp)
          .then((contacts) => {
            this.$store.commit('setContacts', contacts)
            this.$store.commit('buildSearchableAttributes')
            this.$router.push({name: 'AttribVerification'})
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    passwordConfirmation () {
      return this.signUp.password === this.signUp.password_confirmation ? this.signUp.password : 1
    }
  },
  mounted () {
    this.signUp.email = this.$store.getters.getSignInData.email
    this.signUp.phone = this.$store.getters.getSignInData.phone
  }
}
</script>

<style lang="scss" scoped>
  .sign-up {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .sign-up > * {
    flex-shrink: 0;
  }
  .top {
    color: #1BBC9B;
    background-color: #fff;
  }
  .body {
    color: white;
    background-color: #1BBC9B;
    flex-grow: 1;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .el-row {
      width: 100%;
      height: 75px;
      margin-bottom: 50px;
    }
  }
  h1 {
    font-size: 96px;
    margin: 0;
  }
  h2 {
    font-size: 36px;
    margin: 5px;
  }
  @media screen and (max-width: 350px){
    h1 {
      font-size: 74px;
      margin: 0;
    }
    h2 {
      font-size: 20px;
      margin: 5px;
    }
  }
</style>


