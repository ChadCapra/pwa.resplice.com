<template>
  <div class="background">
    <div class="signin">
      <el-steps :active="active" align-center>
        <el-step title="Sign Up"></el-step>
        <el-step title="Add your info"></el-step>
        <el-step title="Invite people"></el-step>
        <el-step title="Enjoy!"></el-step>
      </el-steps>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="20" :md="16" :lg="12" :xl="6">
          <div class="sign-logo"><img :src="logo" alt="Resplice Logo"></div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
          <div class="sign-field"><el-input placeholder="First Name" v-model="userData.firstName">
            <template slot="prepend"><icon name="user"></icon></template>
          </el-input></div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
          <div class="sign-field"><el-input placeholder="Last Name" v-model="userData.lastName">
            <template slot="prepend"><icon name="user"></icon></template>
          </el-input></div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
          <div class="sign-field"><el-input placeholder="Email" v-model="userData.email">
            <template slot="prepend"><icon name="envelope"></icon></template>
          </el-input></div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
          <div class="sign-btn"><el-button type="primary" @click="signUp">Sign Up</el-button></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      logo: require('../../assets/re_logo.png'),
      active: 0
    }
  },
  methods: {
    signUp () {
      this.$alert('This user signed up', 'Sign Up', {
        confirmButtonText: 'Continue',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
      this.$router.push({ name: 'Container' })
    }
  }
}
</script>

<style scoped>
 .sign-field {
   padding: 5px;
 }
 .sign-btn {
   padding: 10px;
 }
 .sign-logo {
   padding-top: 50px;
   padding-bottom: 40px;
 }
 .background {
   background-image: url('../../assets/signup.jpg');
   background-size: cover;
   background-position: center;
   width: 100%;
   overflow: hidden;
   z-index: -1;
 }
 .signin {
   padding-top: 10px;
 }
</style>


