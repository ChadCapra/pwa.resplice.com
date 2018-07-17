<template> 
  <div class="settings-page">
    <div class="stats">
      <el-row><h4>Stats</h4></el-row>
      <el-row>
        <el-col :span="12"><span>Shared To</span><br>{{ stats.sharesTo }}</el-col>
        <el-col :span="12"><span>Shared With</span><br>{{ stats.sharesWith }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><span>Contacts</span><br>{{ stats.contacts }}</el-col>
        <el-col :span="12"><span>Codes Scanned</span><br>{{ stats.codes }}</el-col>
      </el-row>
    </div>
    <div class="settings">
      <el-row type="flex" justify="start" class="settings-header">User Settings</el-row>
      <el-row type="flex" justify="start">
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"><icon name="user" scale="1.5"></icon></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="23" :xl="23">User Profile</el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"><icon name="shield" scale="1.5"></icon></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="23" :xl="23">Privacy &amp; Safety</el-col>
      </el-row>

      <hr>

      <el-row type="flex" justify="start" class="settings-header">App Settings</el-row>
      <el-row type="flex" justify="start">
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"><icon name="bell" scale="1.5"></icon></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="23" :xl="23">Notifications</el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"><icon name="eye" scale="1.5"></icon></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="23" :xl="23">Appearance</el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"><icon name="language" scale="1.5"></icon></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="23" :xl="23">Language</el-col>
      </el-row>

      <hr>

      <el-row type="flex" justify="start" class="settings-header">App Information</el-row>
      <el-row type="flex" justify="start">
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"><icon name="question-circle" scale="1.5"></icon></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="23" :xl="23">Support</el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"><icon name="file" scale="1.5"></icon></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="23" :xl="23">Give Us Feedback :)</el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"><icon name="balance-scale" scale="1.5"></icon></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="23" :xl="23">Legal &amp; Terms of Use</el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"><icon name="info-circle" scale="1.5"></icon></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="23" :xl="23">About Resplice</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from '@/skeleton/SlideModal.vue'

export default {
  components: {
    're-modal': Modal
  },
  data () {
    return {
      toggle: true,
      showModalLegal: false,
      showModalAbout: false,
      showModalFeedback: false,
      feedback: {
        type: [],
        desc: '',
        device: navigator
      },
      stats: {
        sharesTo: 10,
        sharesWith: 8,
        contacts: 8,
        codes: 6
      }
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
      this.$router.push({ name: 'Signin' })
      this.logout() // Action created by mapActions
    },
    toggleShowRecentlyContacted () {
      this.$store.commit('toggleShowRecentlyContacted', this.toggle)
    },
    feedbackSubmit () {
      console.log(this.feedback)
      // make api request to bug/feature tracker
    },
    handleSupport () {
      window.location.href = 'mailto:support@capabit.com?subject=Resplice%20Support&body=Message%20goes%20here'
    },
    handleDownload () {
      var userDataUrl = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.$store.state.user))} download="user.json"`
      console.log(userDataUrl)
      // window.location.href = userDataUrl
    }
  },
  created () {
    this.$store.state.header.showSearch = false
  }
}
</script>

<style lang="scss" scoped>
  .stats {
    background-color: #1BBC98;
    width: 100vw;
    margin-top: -20px;
    margin-left: -20px;
    color: white;
    padding: 10px 0 15px 0;
    font-size: 36px;
    & span {
      font-size: 12px;
      text-transform: uppercase;
      opacity: 0.8;
    }
    & h4 {
      margin: 0;
      opacity: 0.9;
    }
  }

  .settings {
    & .el-col {
      display: flex;
      align-items: center;
      padding: 10px 5px;
      text-align: left;
    }
  }
  .settings-header {
    padding: 15px 5px;
    font-size: 12px;
    font-weight: bold;
    opacity: 0.7;
    text-transform: uppercase;
  }

  hr {
    opacity: 0.5;
  }

  .fa-icon {
    color: #1BBC98;
  }
</style>

