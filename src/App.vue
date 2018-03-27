<template>
  <div id="app">
    <main>
      <router-view style="height: 100vh;"></router-view>
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
  width: 100%;
  height: 100vh;
  /* background-color: white; */
}

main {
  text-align: center; 
}

a {
  color:bisque;
}
</style>
