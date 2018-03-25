<template>
  <el-container>
    <el-menu-item index="1">
      <icon name="users"></icon>
      <span slot="title">Groups</span>
    </el-menu-item>
    <el-menu-item index="2">
      <icon name="comment"></icon>
      <span slot="title">Message</span>
    </el-menu-item>
    <el-menu-item index="3">
      <icon name="phone"></icon>
      <span slot="title">Phone</span>
    </el-menu-item>
    <el-menu-item index="4">
      <icon name="map"></icon>
      <span slot="title">Map</span>
    </el-menu-item>
  </el-container>
  <!-- <div>
    <sui-sidebar animation="push" width="wide" :visible=nav>
      <div class="sidebar">
        <sui-menu secondary>
          <sui-menu-item>
            <sui-button color="black" animated @click="setNavVisible" class="nav-btn">
              <sui-button-content visible>
                <sui-icon size="large" name="bars" />
              </sui-button-content>
              <sui-button-content hidden>
                <sui-icon name="left arrow" />
              </sui-button-content>
            </sui-button>
          </sui-menu-item>
        </sui-menu>
        <sui-divider />
        <sui-container class="nav-btns" text-align="left">
          <sui-button class="nav-btn" content="Groups" icon="users" label-position="left" />
          <sui-button class="nav-btn" content="Messages" icon="comment" label-position="left" />
          <sui-button class="nav-btn" content="Phone" icon="phone" label-position="left" />
          <sui-button class="nav-btn" content="Map" icon="map" label-position="left" />
        </sui-container>
      </div>
    </sui-sidebar>
  </div> -->
</template>

<script>
export default {
  props: ['nav', 'setNavVisible']
}
</script>

<style>
  .side-bar .nav-btn {
    margin-bottom: 20px;
    padding: 10px;
  }

  .sidebar {
    background-color: #1BBC9B;
    height: 100%;
  }

  .test {
    background-color: #1BBC9B;
  }

  .nav-btns {
    padding: 20px;
    background-color: lightblue;
  }
</style>
