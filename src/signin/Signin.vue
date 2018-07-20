<template>
  <div class="background">
    <div class="signin">
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="20" :md="16" :lg="12" :xl="6">
          <div class="sign-logo"><img :src="logo" width="250" height="250" alt="Resplice Logo"></div>
        </el-col>
      </el-row>
      <!-- Login form -->
      <div class="form-login" v-show="isLogin">
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-field"><el-input placeholder="Username" v-model="loginData.username">
              <template slot="prepend"><icon name="user"></icon></template>
            </el-input></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-field"><el-input type="password" placeholder="Password" v-model="loginData.password">
              <template slot="prepend"><icon name="lock"></icon></template>
            </el-input></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
              <div class="sign-btn">
                <el-button type="primary" plain @click="isLogin = false; initialState = true">Prev</el-button>
                <el-button type="primary" @click="login">Login</el-button>
              </div>
            </el-col>
          </el-row>
      </div>
      <div class="btns" v-show="initialState">
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="g-signin2" data-onsuccess="onSignIn" data-width="190" data-height="40" data-longtitle="true" data-theme="light"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-btn">
              <el-button type="primary" plain @click="$router.push({ name: 'Welcome' })">Sign Up</el-button>
              <el-button type="primary" @click="isLogin = true; initialState = false">Login</el-button>
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
      isLogin: false,
      initialState: true,
      logo: require('../assets/RespliceLogoTempAlt.png'),
      loginData: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.getGroupsLoading
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
    },
    login () {
      this.$store.dispatch('login', this.loginData)
      this.$router.push({ name: 'root' })
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
.g-signin2 {
  display: flex;
  justify-content: center;
}
</style>


