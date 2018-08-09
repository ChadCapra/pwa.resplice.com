<template>
  <div class="background" v-loading.fullscreen.lock="loading">
    <div class="signin">
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="20" :md="16" :lg="12" :xl="6">
          <div class="sign-logo"><img :src="logo" width="250" height="250" alt="Resplice Logo"></div>
        </el-col>
      </el-row>

      <!-- Login Prompt -->
      <div v-if="!bothAttribsFound" class="form-login">
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-field">
              <el-input ref="email" type="email" placeholder="Enter Email" v-model="email" @focus="resetStyle($refs.email.$el.children[1])">
                <template slot="prepend"><icon name="envelope"></icon></template>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-field"><el-input ref="phone" type="tel" placeholder="Enter Phone" v-model="phone" @focus="resetStyle($refs.phone.$el.children[1])">
              <template slot="prepend"><icon name="phone" scale="1.2"></icon></template>
            </el-input></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-btn">
              <el-button type="primary" @click="validateInputs">Get Started</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- Password Prompt -->
      <div v-else class="form-login">
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-field"><el-input ref="password" type="password" placeholder="Enter Password" v-model="password" @focus="resetStyle($refs.password.$el.children[1])">
              <template slot="prepend"><icon name="lock"></icon></template>
            </el-input></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
            <div class="sign-btn">
              <el-button type="primary" @click="validatePassword">Login</el-button>
            </div>
          </el-col>
        </el-row>
        <router-link to="/forgot-password">Forgot Password?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      logo: require('../assets/RespliceLogoTempAlt.png'),
      bothAttribsFound: false
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
    },
    signInData () {
      return this.$store.getters.getSignInData
    },
    email: {
      get () {
        return this.signInData.email
      },
      set (value) {
        this.$store.commit('setSignInEmail', value)
      }
    },
    phone: {
      get () {
        return this.signInData.phone
      },
      set (value) {
        this.$store.commit('setSignInPhone', value)
      }
    },
    password: {
      get () {
        return this.signInData.password
      },
      set (value) {
        this.$store.commit('setSignInPassword', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'matchAttributes',
      'signIn'
    ]),
    checkAttribs () {
      this.loading = true
      this.matchAttributes({ email: this.signInData.email, phone: this.signInData.phone })
        .then((number) => {
          this.loading = false
          switch (number) {
            case 0:
              this.$router.push({ name: 'SignUp' })
              break
            case 1:
              this.$router.push({ name: 'OneMatch' })
              break
            case 2:
              this.bothAttribsFound = true
              break
            default:
              console.log('An Error has occured')
              break
          }
        })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    },
    login () {
      this.loading = true
      this.signIn(this.signInData)
        .then(() => {
          this.$router.push({ name: 'root' })
        })
        .catch((error) => {
          this.loading = false
          this.$notify({
            title: 'Password Incorrect',
            message: 'Your password was incorrect please try again',
            type: 'error'
          })
          console.log(error)
        })
    },
    validateInputs () {
      var email = this.$refs.email
      var phone = this.$refs.phone

      if (email.currentValue.length > 0 && phone.currentValue.length > 0) {
        this.checkAttribs()
      } else if (email.currentValue.length <= 0) {
        this.$notify({
          title: 'Email Required',
          message: 'Please enter an email address',
          type: 'error'
        })
        email.$el.children[1].style = 'border: 2px solid #ff0000ad;'
      } else if (phone.currentValue.length <= 0) {
        this.$notify({
          title: 'Phone Number Required',
          message: 'Please enter a phone number',
          type: 'error'
        })
        phone.$el.children[1].style = 'border: 2px solid #ff0000ad;'
      } else {
        this.$notify({
          title: 'Fields Required',
          message: 'Please enter an email & a phone number',
          type: 'error'
        })
        email.$el.children[1].style = 'border: 2px solid #ff0000ad;'
        phone.$el.children[1].style = 'border: 2px solid #ff0000ad;'
      }
    },
    validatePassword () {
      var password = this.$refs.password

      if (password.currentValue.length > 0) {
        this.login()
      } else {
        this.$notify({
          title: 'Password Required',
          message: 'Please enter a password',
          type: 'error'
        })
        password.$el.children[1].style = 'border: 2px solid #ff0000ad;'
      }
    },
    resetStyle (inputField) {
      inputField.style = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-field {
  padding: 5px;
}
.sign-btn {
  padding: 10px;
  margin-top: 25px;
  & .el-button {
    border-radius: 5px;
  }
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

.form-login {
  & a {
    color: white;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>


