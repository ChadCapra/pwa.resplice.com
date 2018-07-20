<template>
  <div class="sign-up">
    <div class="top">
      <h1>Sign Up</h1>
      <h2>Pick a username &amp; a password</h2>
    </div>
    <div class="body">
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="input-title">User Name</h3>
          <input type="text" placeholder="User Name" class="input" v-model="userName">
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="input-title">Password</h3>
          <input type="password" placeholder="Password" class="input" v-model="password">
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="16" :lg="8" :xl="8">
          <h3 class="input-title">Confirm Password</h3>
          <input type="password" placeholder="Password" class="input" v-model="confirmPassword">
        </el-col>
      </el-row>
      <el-button class="sub-btn" @click="submit" type="primary">Sign Up</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUserInfo
    }
  },
  methods: {
    submit () {
      console.log(this.userName, this.password, this.confirmPassword)
      this.$store.dispatch('changeUserName', this.userName)
      this.$store.dispatch('changePassword', this.password)
      this.$store.dispatch('signUp', this.user)
      this.$router.push({name: 'Share'})
    }
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
  .input {
    outline: 0;
    border: 0;
    height: 80%;
    width: 100%;
    background: transparent;
    border-bottom: 2px solid #fff;
    color: #fff;
    font-size: 16px;
    height: 45px;
  }
  .input-title {
    display: flex;
    justify-content: flex-start;
    margin: 0;
  }
  .sub-btn {
    background-color: #fff;
    color: #1BBC9B;
  }
</style>


