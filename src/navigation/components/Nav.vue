<template>
  <div>
    <sui-sidebar class="sidebar" animation="push" width="wide" :visible=nav>
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
    </sui-sidebar>
  </div>
</template>

<script>
export default {
  props: ['nav', 'setNavVisible']
}
</script>

<style>
  .nav-btn {
    margin: auto;
    padding: 10px;

  }

  .sidebar {
    background-color: #1BBC9B;
    padding: 10px;
  }

  .test {
    background-color: #1BBC9B;
  }
</style>
