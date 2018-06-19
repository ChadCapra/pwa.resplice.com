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
  name: 'app',
  created () {
    if (this.$store.state.loggedIn) {
      this.$store.dispatch('login')
    }
  }
}
</script>

<style lang="scss">
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

.pic-placeholder {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: linear-gradient(271deg, #b4b7b6, #999999);
  background-size: 400% 400%;

  -webkit-animation: skeleton 1.5s ease infinite;
  -moz-animation: skeleton 1.5s ease infinite;
  animation: skeleton 1.5s ease infinite;

  @-webkit-keyframes skeleton {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
  @-moz-keyframes skeleton {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
  @keyframes skeleton { 
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
}
</style>
