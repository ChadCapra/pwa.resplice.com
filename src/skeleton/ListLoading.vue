<template>
<div>
  <div v-for="i in 6" :key="i" class="contact"></div>
</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .contact {
    margin-bottom: 20px;
    transition: all .30s ease;
    border-radius: 50px;
    font-size: 24px;
    text-align: left;
    height: 80px;

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
