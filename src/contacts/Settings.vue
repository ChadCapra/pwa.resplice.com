<template>
  <div class="settings">
    <el-card>
      <div slot="header" class="setting-header">User Settings</div>
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
          <icon name="lock" scale="2" color="#1BBC9B"></icon>
          <el-input type="password" placeholder="Confirm Password"></el-input>
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
        <div class="setting">
          <el-button @click="$router.push('/userprofile')" type="primary">Edit Profile</el-button>
        </div>
      </div>
    </el-card>
    <el-card>
      <div slot="header" class="setting-header">App Settings</div>
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
    <el-card>
      <div class="setting-header" slot="header">App Information</div>
      <div class="setting-content">
        <el-button @click="handleSupport" type="danger" plain>Support</el-button>
        <el-button @click="showModalFeedback = true" type="warning" plain>Give us Feedback :)</el-button>
        <el-button @click="showModalLegal = true" type="info" plain>Legal &amp; Terms of Use</el-button>
        <el-button @click="showModalAbout = true" type="primary" plain>About Resplice</el-button>
      </div>
    </el-card>
    <div class="buttons">
      <el-button type="success" @click="handleDownload">Download Your Data</el-button>
      <el-button type="danger" @click="userLogout">Logout</el-button>
    </div>
    <re-modal v-show="showModalLegal" @close="showModalLegal = false">
      <h1>Legal &amp; Terms of Use</h1>
      <p>Here lies resplice's terms of use and the legal mumbo jumbo that no one reads. We need to be GDPR Compliant though :)</p>
    </re-modal>
    <re-modal v-show="showModalAbout" @close="showModalAbout = false">
      <h1>About Resplice</h1>
      <p>Resplice is an online address book to ensure you always have the most up-to-date information on your contacts</p>
    </re-modal>
    <re-modal v-show="showModalFeedback" @close="showModalFeedback = false">
      <el-form ref="feedbackForm" class="feedback-form">
        <el-form-item label="Feedback Type">
          <el-checkbox-group v-model="feedback.type">
            <el-checkbox label="Bug" name="type"></el-checkbox>
            <el-checkbox label="Feature Request" name="type"></el-checkbox>
            <el-checkbox label="Enhancement" name="type"></el-checkbox>
            <el-checkbox label="Kudos" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Feedback Description">
          <el-input type="textarea" v-model="feedback.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="feedbackSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </re-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from '@/contacts/SlideModal.vue'

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
    & .is-plain {
      margin: 0 0 10px 0;
    }
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

