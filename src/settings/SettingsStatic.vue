<template>
  <div class="static">
    <div v-if="showSupport" class="support">
      <p>Please email us at <a href="mailto:support@capabit.com?subject=Resplice%20Support&body=Message%20goes%20here">support@capabit.com</a></p>
      <p>Or go to our <a href="http://www.resplice.com">support page</a></p>
    </div>
    <div v-if="showFeedback" class="feedback">
      <el-form ref="feedbackForm" class="feedback-form">
        <el-form-item label="Feedback Type">
          <el-radio-group v-model="feedback.type">
            <el-radio label="Bug"></el-radio>
            <el-radio label="Feature Request"></el-radio>
            <el-radio label="Enhancement"></el-radio>
            <el-radio label="Kudos"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Feedback Description">
          <el-checkbox label="Send us your device information" name="information"></el-checkbox>
        </el-form-item>
        <el-form-item label="Feedback Description">
          <el-input type="textarea" v-model="feedback.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="feedbackSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="showLegal" class="legal">
      <p>Here lies resplice's terms of use and the legal mumbo jumbo that no one reads. We need to be GDPR Compliant though :)</p>
    </div>
    <div v-if="showAbout" class="about">
      <p>Resplice is an online address book to ensure you always have the most up-to-date information on your contacts</p>
      <a href="http://www.resplice.com">See Our Website</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showSupport: false,
      showFeedback: false,
      showLegal: false,
      showAbout: false,
      feedback: {
        type: [],
        desc: '',
        device: navigator.userAgent
      }
    }
  },
  methods: {
    feedbackSubmit () {
      this.$store.dispatch('feedbackSubmit', this.feedback)
      this.$router.push({path: '/settings'})
    }
  },
  mounted () {
    switch (this.$route.params.name) {
      case 'support':
        this.$store.commit('setSettingsHeaderText', 'Support')
        this.showSupport = true
        break
      case 'feedback':
        this.$store.commit('setSettingsHeaderText', 'Feedback')
        this.showFeedback = true
        break
      case 'legal':
        this.$store.commit('setSettingsHeaderText', 'Legal')
        this.showLegal = true
        break
      case 'about':
        this.$store.commit('setSettingsHeaderText', 'About')
        this.showAbout = true
        break
      default:
        this.$store.commit('setSettingsHeaderText', 'About')
        this.showAbout = true
        break
    }
  }
}
</script>

<style lang="scss" scoped>
  .static {
    text-align: left;
  }
  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .el-radio {
    margin: 0;
    width: 120px;
    margin: 5px 0;
  }
</style>


