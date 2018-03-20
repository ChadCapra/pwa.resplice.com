<template>
    <div id="signin">
        <h1>This is the sign in page</h1>
        <br>
        <sui-input placeholder="First Name" />
        <br>
        <br>
        <sui-input placeholder="Last Name" />
        <br>
        <br>
        <sui-input placeholder="Email" />
        <br>
        <br>
        <button>Sign Up</button>
    </div>
</template>

<script>
export default {
  name: 'signin'
}
</script>

<style scoped>
#signin {
    /* height: 800px;
    width: 500px; */
    margin: auto;
    overflow: auto;
    /* position: relative; */
}
/* #signin::before {
    content: "";
    position: fixed;
    left: 0;
    right: 0;
    z-index: -1;

    display: block;
    background-image: url('../assets/signin.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;

    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -o-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
} */
</style>


