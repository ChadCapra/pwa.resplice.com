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
    const ls = window.localStorage
    // Check for stored user information
    if (ls.getItem('id') && ls.getItem('token')) {
      // If user is offline, check token expiry load cached state
      // Otherwise, try to login with stored info
      // this.$store.dispatch('tokenLogin', ls)
      console.log(ls)
    } else {
      // Otherwise if no stored information redirect to signin page
    }
  }
}
</script>

<style lang="scss">
// Colors
$purple: #BB6BD9;
$green: #27AE60;
$orange: #F2994A;
$blue: #2D9CDB;
$pink: #ED4B82;
$sea-foam: #33AB9F;
$red: #F6685E;
$dark-purple: #8561C5;
$sky-blue: #33C9DC;
$colors: $purple, $green, $orange, $blue, $pink, $sea-foam, $red, $dark-purple, $sky-blue;


// Select random color for profile pic backgrounds and tags
$key: random(length($colors));
$random: nth($colors, $key);

*:focus {
  outline: 0;
}
* {
  -webkit-tap-highlight-color: transparent;
}
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
  color: #1BBC98;
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

.profile-pic-placeholder, .profile-pic-thumb-placeholder, .profile-pic-thumb-share-placeholder {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: $random;
  font-size: 94px;
}
.profile-pic-thumb-placeholder {
  width: 80px;
  height: 80px;
  font-size: 48px;
}
.profile-pic-thumb-share-placeholder {
  width: 50px;
  height: 50px;
  font-size: 36px;
}

.profile-pic-loading {
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

@media screen and (max-width: 700px) {
  .el-dialog {
    width: 90%;
  }
}

// Custom Button Styles
.white-btn {
  // Use with el-button type="primary"
  color:#1BBC98;
  background-color: white;
  border-radius: 5px;
  font-size: 18px;
}

.el-button {
  border-radius: 5px;
}

// Input Styles

// Sign In Flow Input
.signin-input {
  outline: 0;
  border: 0;
  width: 100%;
  background: transparent;
  border-bottom: 2px solid #fff;
  color: #fff;
  font-size: 16px;
  height: 45px;
}
.signin-input-title {
  display: flex;
  justify-content: flex-start;
  margin: 0;
}
</style>
