<template>
  <header>
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
  </header>
</template>

<script>
export default {
  props: ['setNavVisible']
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