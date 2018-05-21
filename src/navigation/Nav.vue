<template>
  <div>
    <icon class="nav-btn-w" name="bars" @click.native="setNavVisible" scale="2.5" label="Navigation"></icon>
    <img :src="profilePic" alt="Profile Pic">
    <icon class="nav-btn-w" name="user-circle" scale="2.5" label="Profile"></icon>
    <el-menu default-active="1" background-color="#1BBC9B" text-color="#ffffff" active-text-color="#35495E">
      <el-menu-item index="1" @click="goToHome">
        <icon name="user" scale="2.5"></icon>
        <span slot="title">Contacts</span>
      </el-menu-item>
      <el-menu-item index="2">
        <icon name="users" scale="2.5"></icon>
        <span slot="title">Groups</span>
      </el-menu-item>
      <el-menu-item index="3">
        <icon name="comment" scale="2.5"></icon>
        <span slot="title">Message</span>
      </el-menu-item>
      <el-menu-item index="4">
        <icon name="phone" scale="2.5"></icon>
        <span slot="title">Phone</span>
      </el-menu-item>
      <el-menu-item index="5">
        <icon name="map" scale="2.5"></icon>
        <span slot="title">Map</span>
      </el-menu-item>
      <el-menu-item index="6">
        <icon name="cog" scale="2.5"></icon>
        <span title="Settings">Settings</span>
      </el-menu-item>
      <el-menu-item index="7" @click="goToSignin">
        <icon name="sign-out" scale="2.5"></icon>
        <span title="Sign Out">Sign Out</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['setNavVisible'],
  data () {
    return {
      index: 0,
      profilePic: require('../assets/bastilla.png')
    }
  },
  methods: {
    goToHome () {
      this.$router.push({ name: 'Container' })
    },
    goToSignin () {
      this.$router.push({ name: 'Signin' })
    }
  }
}
</script>

<style scoped>
  .el-menu-item {
    margin-top: 15px;
    font-size: 36px;
  }
  .nav-btn-w {
    margin-left: 20px;
    margin-right: 20px;
    vertical-align: top;
    transition: all 0.3s ease;
  }
  .nav-btn-w:hover {
    cursor: pointer;
    color: #35495E;
  }
</style>
