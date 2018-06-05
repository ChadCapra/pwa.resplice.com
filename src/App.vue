<template>
  <div id="app">
    <main>
      <transition>
        <router-view style="height: 100vh;"></router-view>
      </transition>
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
  background-color: #fff;
}

#app {
  font-family: 'Sanchez', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #32393d;
  width: 100%;
  height: 100vh;
}

main {
  text-align: center; 
}

a {
  color:bisque;
}
button, span {
  outline: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent; 
}
</style>
