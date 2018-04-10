<template>
  <el-menu
    :default-active="activeIndex"
    class="nav-menu"
    mode="horizontal"
    @select="navSelect"
    background-color="#32393D"
    text-color="#fff"
    active-text-color="#1BBC9B">
    <el-menu-item index="1">
      <icon name="address-book" scale="2"></icon>
    </el-menu-item>
    <el-menu-item index="2">
      <icon name="users" scale="2"></icon>
    </el-menu-item>
    <el-menu-item index="3">
      <icon name="map" scale="2"></icon>
    </el-menu-item>
    <el-menu-item index="4">
      <icon name="user" scale="2"></icon>
    </el-menu-item>
    <el-menu-item index="5">
      <icon name="cog" scale="2"></icon>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    navSelect () {
      console.log('Button Selected')
    }
  }
}
</script>

<style scoped>
.nav-menu {
  text-align: center;
}
.el-menu-item {
  margin-left: 1vw;
  margin-right: 1vw;
}
</style>


