<template>
  <div class="appearance-settings">
    <div class="setting">
      <el-row type="flex" justify="start" class="settings-header">Format</el-row>
      <el-row>
        <el-col :span="16" class="settings-item">Name Format
          <span>Choose the format of the contact names</span>
        </el-col>
        <el-col :span="8" class="settings-item">
          <el-select v-model="nameFormat" placeholder="Name Format">
            <el-option value="First Last"></el-option>
            <el-option value="Last First"></el-option>
          </el-select>
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
    },
    nameFormat: {
      get () {
        return this.$store.getters.getSettings.nameFormat
      },
      set (value) {
        this.$store.commit('setNameFormat', value)
      }
    }
  },
  created () {
    this.$store.commit('setSettingsHeaderText', 'Appearance')
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