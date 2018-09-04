<template>
  <div class="notif-settings">
    <div class="setting">
      <el-row type="flex" justify="start" class="settings-header">System Notifications</el-row>
      <el-row>
        <el-col :span="20" class="settings-item">Enable Push Notifications
          <span>Push notifications allow us to notify you of new share and group requests.</span>
        </el-col>
        <el-col :span="4" class="settings-item">
          <el-switch v-model="pushNotifications"></el-switch>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    pushNotifications: {
      get () {
        return this.$store.getters.getSettings.pushNotifications
      },
      set (value) {
        this.$store.commit('setPushNotifications', value)
      }
    }
  },
  created () {
    this.$store.commit('setSettingsHeaderText', 'Notifications')
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
</style>
