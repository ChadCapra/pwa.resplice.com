<template>
  <div class="appearance">
    <div class="setting">
      <el-row type="flex" justify="start" class="settings-header">Language</el-row>
      <el-row>
        <el-col :span="16" class="settings-item">
          <div class="settings-title"><icon name="globe" scale="2" color="#1BBC9B"></icon>Change your language</div>
          <span>Choose a language from the list to change.</span>
        </el-col>
        <el-col :span="8" class="settings-item">
          <el-select v-model="lang" placeholder="Language">
            <el-option value="English"></el-option>
            <el-option value="Spanish"></el-option>
            <el-option value="German"></el-option>
            <el-option value="French"></el-option>
            <el-option value="Chinese"></el-option>
            <el-option value="Japanese"></el-option>
            <el-option value="Korean"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    lang: {
      get () {
        return this.$store.getters.getSettings.lang
      },
      set (value) {
        this.$store.commit('setLanguage', value)
      }
    }
  },
  created () {
    this.$store.commit('setSettingsHeaderText', 'Language')
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
  .settings-title {
    justify-content: center;
    align-items: center;
    display: flex;
    & .fa-icon {
      margin-right: 15px;
    }
  }
</style>

