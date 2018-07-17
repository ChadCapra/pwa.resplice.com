<template>
  <div class="modal" v-loading="loading">
    <div class="modal-header">
      <h1>{{ headerText }}</h1>
      <icon class="close" name="times" scale="2" @click.native="$emit('close')"></icon>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['loading', 'headerText']
}
</script>

<style lang="scss" scoped>
.modal {
  height: 100%;
  width: calc(100% - 50px);
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  padding: 25px;
  background-color: white;
  -webkit-transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  -moz-transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  -o-transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
  & p {
    text-align: left;
  }
}
.modal-header {
  width: 100vw;
  margin-left: -25px;
  margin-top: -25px;
  padding: 25px 0;
  color: #FFFFFF;
  background-color: #1BBC98;
  & h1 {
    margin: 0;
  }
}
.close {
  position: fixed;
  top: 1%;
  right: 2%;
  &:hover {
    color: #32393D;
    cursor: pointer;
  }
}
</style>
