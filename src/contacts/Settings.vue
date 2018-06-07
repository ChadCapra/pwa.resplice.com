<template>
  <div class="settings">
    <el-card>
      <div slot="header" class="setting-header">Account</div>
      <div class="setting-content">
        <div class="setting">
          <icon name="user" scale="2" color="#1BBC9B"></icon>
          <el-input placeholder="User Name"></el-input>
        </div>
        <div class="setting">
          <icon name="lock" scale="2" color="#1BBC9B"></icon>
          <el-input type="password" placeholder="Password"></el-input>
        </div>
        <div class="setting">
          <icon name="globe" scale="2" color="#1BBC9B"></icon>
          <el-select v-model="lang" placeholder="Language">
            <el-option value="English"></el-option>
            <el-option value="Spanish"></el-option>
            <el-option value="German"></el-option>
            <el-option value="French"></el-option>
            <el-option value="Chinese"></el-option>
            <el-option value="Japanese"></el-option>
            <el-option value="Korean"></el-option>
          </el-select>
        </div>
      </div>
    </el-card>
    <el-card>
      <div slot="header" class="setting-header">App</div>
      <div class="setting-content">
        <div class="setting-text">
          <span style="opacity: 0.7;">Name Format</span>
          <el-select v-model="nameFormat" placeholder="Name Format">
            <el-option value="First Last"></el-option>
            <el-option value="Last First"></el-option>
          </el-select>
        </div>
        <div class="setting">
          <span style="opacity: 0.7;">Show Recently Contacted</span>
          <el-switch v-model="toggle" @change="toggleShowRecentlyContacted"></el-switch>
        </div>
      </div>
    </el-card>
    <div class="buttons">
      <el-button type="success">Download Your Data</el-button>
      <el-button type="danger" @click="userLogout">Logout</el-button>
      <el-button type="warning">Give Us Feedback :)</el-button>
      <el-button type="info">Legal &amp; Terms of use</el-button>
      <el-button type="primary">About Resplice</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      toggle: true
    }
  },
  computed: {
    lang: {
      get () {
        return this.$store.state.user.lang
      },
      set (value) {
        this.$store.commit('updateLanguage', value)
      }
    },
    nameFormat: {
      get () {
        return this.$store.state.settings.nameFormat
      },
      set (value) {
        this.$store.commit('changeNameFormat', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'logout' // `this.logout` maps to `this.$store.dispatch('logout')`
    ]),
    userLogout () {
      this.logout()
      this.$router.push({ name: 'Signin' })
    },
    toggleShowRecentlyContacted () {
      this.$store.commit('toggleShowRecentlyContacted', this.toggle)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-card {
    margin-bottom: 20px;
  }
  .el-switch {
    margin-left: 50px;
  }
  .setting-header {
    color: #1BBC9B;
  }
  .setting-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .setting {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  .setting-text {
    text-align: left;
    margin-top: 15px;
  }
  .fa-icon {
    margin-right: 15px;
  }
  @media screen and (max-width: 850px) {
    .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .buttons .el-button {
      margin-bottom: 15px;
      margin-left: 0px;
      width: 250px;
    }
  }
</style>

