<template>
  <div class="modal">
    <icon class="close" name="times" scale="2" @click.native="$emit('close')"></icon>
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.modal {
  height: 100%;
  width: 90%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  padding: 5%;
  display: flex;
  flex-direction: column;
  background-color: rgb(248, 250, 247);
  -webkit-transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  -moz-transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  -o-transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
}
.close {
  position: fixed;
  top: 1%;
  right: 2%;
}
</style>
