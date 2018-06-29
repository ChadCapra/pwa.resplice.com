<template>
  <div class="attributes">
    <div class="top">
      <h1>Attributes</h1>
      <h2>Sharing with {{ sharingContacts.length }} people</h2>
      <p>Select the attributes you would like to share:</p>
    </div>
    <div class="body">
      <div class="minimal">
        <input type="checkbox" name="select" id="minimal" class="checkbox">
        <!-- <span class="checkbox"></span> -->
        <span>Share minimal attributes</span>
        <div class="btns">
          <el-button class="btn" type="primary" round>View</el-button>
        </div>
      </div>
      <div class="default">
        <input type="checkbox" name="select" id="default" class="checkbox">
        <!-- <span class="checkbox"></span> -->
        <span>Share default attributes</span>
        <div class="btns">
          <el-button class="btn" type="primary" round>View</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    sharingContacts () {
      return this.$store.getters.getSharingContacts
    },
    attributes () {
      return this.$store.getters.getUserAttributes
    }
  }
}
</script>

<style lang="scss" scoped>
  .attributes {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .attributes > * {
    flex-shrink: 0;
  }
  .top {
    color: #1BBC9B;
    background-color: #fff;
  }
  .body {
    color: white;
    background-color: #1BBC9B;
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-size: 78px;
    margin: 0;
  }
  h2 {
    font-size: 36px;
    margin: 5px;
  }
  @media screen and (max-width: 350px){
    h1 {
      font-size: 62px;
      margin: 0;
    }
    h2 {
      font-size: 20px;
      margin: 5px;
    }
  }
  .btn {
    background-color: #fff;
    color: #1BBC9B;
  }
  .minimal, .default {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .minimal {
    margin: 10px 0 15px 0;
  }
  .default {
    margin: 15px 0 10px 0;
  }
  .checkbox {
    position: relative;
    height: 25px;
    width: 25px;
    cursor: pointer;
    appearance: none;
    outline: 0;
    &:before {
      content: '';

      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;

      width: 100%;
      height: 100%;

      border: 2px solid #FFF;

      transition: all 0.3s ease-in-out;
    }
    &:checked:before {
      height: 50%;
      border-color: #FFF;
      transform: rotate(-45deg);
      border-top-style: none;
      border-right-style: none;
    }
  }
</style>
