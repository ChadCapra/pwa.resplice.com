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
      <!-- Sign up form -->
      <div class="form-signup">
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-field"><el-input placeholder="Username" v-model="signInData.username">
              <template slot="prepend"><icon name="user"></icon></template>
            </el-input></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-field"><el-input placeholder="Password" v-model="signInData.password">
              <template slot="prepend"><icon name="lock"></icon></template>
            </el-input></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-field"><el-input placeholder="Confirm Password" v-model="signInData.cPassword">
              <template slot="prepend"><icon name="lock"></icon></template>
            </el-input></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
              <div class="sign-btn">
                <el-button type="primary" plain @click="this.$router.go(-1)">Prev</el-button>
                <el-button type="primary" @click="signUp">Submit</el-button>
              </div>
            </el-col>
          </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logo: require('../assets/re_logo.png'),
      active: 0,
      signInData: {
        username: '',
        password: '',
        cPassword: ''
      }
    }
  },
  methods: {
    signUp () {
      this.$alert('Welcome to Resplice, please click continue to enter your information', 'Sign Up Successful!', {
        confirmButtonText: 'Continue',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
      this.$router.push({ name: 'Welcome' })
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
  background: #134E5E;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #134E5E, #71B280);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #134E5E, #71B280); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 100%;
  overflow: hidden;
  z-index: -1;
}
.signin {
  padding-top: 10px;
}
</style>


