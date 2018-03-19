<template>
  <div id="app">
    <main>
      <!-- <img src="./assets/logo.png" alt="Vue.js PWA"> -->
      <router-view></router-view>
      <br>
      <router-link to="/">Go back to the main contacts container</router-link>
      <br>
      <router-link to="/signin">Go to Sign-in page</router-link>
      <br>
      <router-link to="/profile">Go to a profile page</router-link>
      <br>
      <router-link to="/notif">Go to the notifications page</router-link>
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
}

a {
  color:bisque;
}
</style>
