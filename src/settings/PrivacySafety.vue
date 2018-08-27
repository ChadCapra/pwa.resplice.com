<template>
  <div class="privacy-settings">
    <div class="setting">
      <el-row type="flex" justify="start" class="settings-header">Group Privacy Defaults</el-row>
      <el-row>
        <el-col :span="20" class="settings-item">Share verified attributes automatically
          <span>When checked, everytime you join a new group, all of your verified attributes will be shared with members of that group.</span>
        </el-col>
        <el-col :span="4" class="settings-item">
          <el-checkbox v-model="groupAttributeShare"></el-checkbox>
        </el-col>
      </el-row>
    </div>

    <hr>

    <div class="setting">
      <el-row type="flex" justify="start" class="settings-header">Your Data</el-row>
      <el-row>
        <el-col :span="20" class="settings-item">Use data to improve Resplice
          <span>This settings tells us if we can use information about how you use our application for analytical purposes.</span>
        </el-col>
        <el-col :span="4" class="settings-item">
          <el-switch v-model="useData"></el-switch>
        </el-col>
      </el-row>
      <el-button type="primary" @click="handleDownload" class="btn-download">Download Your Data</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      settings: 'getSettings'
    }),
    useData: {
      get () {
        return this.settings.useData
      },
      set (value) {
        this.$store.commit('setUseData', value)
      }
    },
    groupAttributeShare: {
      get () {
        return this.settings.groupAttributeShare
      },
      set (value) {
        this.$store.commit('setGroupAttributeShare', value)
      }
    }
  },
  methods: {
    handleDownload () {
      var userDataUrl = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.$store.state.user))} download="user.json"`
      console.log(userDataUrl)
      // window.location.href = userDataUrl
    }
  },
  created () {
    this.$store.commit('setSettingsHeaderText', 'Privacy & Safety')
  }
}
</script>

<style lang="scss" scoped>
  .settings-header {
    padding: 15px 5px;
    font-size: 12px;
    font-weight: bold;
    opacity: 0.7;
    text-transform: uppercase;
  }
  .settings-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 5px;
    text-align: left;
    & span {
      opacity: 0.7;
    }
  }
  .btn-download {
    margin-top: 25px;
  }
</style>


