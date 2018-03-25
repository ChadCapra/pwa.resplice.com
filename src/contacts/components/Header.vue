<template>
  <div>
    <el-row>
      <el-col :span="4"><icon name="bars" scale="2"></icon></el-col>
      <el-col :span="20">
        <el-input
        placeholder="Search..."
        suffix-icon="search"
        v-model="searchInput">
        </el-input>
      </el-col>
    </el-row>
  </div>
  <!-- <header>
    <sui-menu secondary>
      <sui-menu-item>
        <sui-button color="teal" animated @click="setNavVisible" class="nav-btn">
          <sui-button-content visible>
            <sui-icon size="large" name="bars" />
          </sui-button-content>
          <sui-button-content hidden>
            <sui-icon name="right arrow" />
          </sui-button-content>
        </sui-button>
      </sui-menu-item>
      <sui-menu-item>
        <sui-input placeholder="Search Contacts & Groups" icon="search" size="25" />
      </sui-menu-item>
    </sui-menu>
  </header> -->
</template>

<script>
export default {
  props: ['setNavVisible'],
  data () {
    return {
      searchInput: ''
    }
  }
}
</script>

<style>
  header {
    margin: auto;
    padding: 10px;
    background-color:#F2F2F2;
  }

  .center {
    text-align: center;
  }

  .nav-btn {
    background-color: #1BBC9B;
    color: #1BBC9B;
  }
</style>