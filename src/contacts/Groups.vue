<template>
  <div v-if="groups.length > 0" class="groups">
    <el-card v-for="group in groups" :key="group.id" class="group" shadow="hover">
      <div class="g-header" @click="goToGroup(group.id)">
        <h1>{{ group.name }}</h1>
        <div class="g-description">{{ group.description }}</div>
      </div>
      <div class="g-buttons">
        <el-button v-if="!group.shared" type="primary">Share</el-button>
        <el-button type="danger">Delete</el-button>
      </div>
    </el-card>
  </div>
  <div v-else class="none">
    <h1>You have no groups 😥<br>Click below to create one:</h1>
    <el-button type="primary">Create New Group</el-button>
  </div>
</template>

<script>
export default {
  computed: {
    groups () {
      return this.$store.getters.getGroups
    }
  },
  methods: {
    goToGroup (id) {
      this.$router.push({ name: 'group', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.none {
  display: flex;
  flex-direction: column;
}
.groups {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.group {
  margin: 15px;
}
.g-buttons {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.g-header {
  &:hover {
    color: #1BBC9B;
    cursor: pointer;
  }
}
</style>
