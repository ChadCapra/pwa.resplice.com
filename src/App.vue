<template>
  <div id="app">
    <main>
      <!-- <img src="./assets/logo.png" alt="Vue.js PWA"> -->
      <router-view></router-view>
      <router-link to="/">Go back to the main contacts container</router-link>
      <br>
      <router-link to="/signin">Go to Sign-in page</router-link>
      <br>
      <router-link to="/profile">Go to a profile page</router-link>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

a {
  color:bisque;
}
</style>
