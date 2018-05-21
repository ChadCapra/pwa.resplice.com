<template>
  <el-container>
    <template slot="header">
      <el-row>
        <el-col :span="2">
          <icon class="exit-btn" name="arrow-left" scale="2" @click.native="exitProfile"></icon>
        </el-col>
        <el-col justify="right">
          <button>EDIT</button>
        </el-col>
        <el-col>
          <button>SHARE</button>
        </el-col>
      </el-row>
    </template>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      swiped: false
    }
  },
  methods: {
    handleSwipe () {
      this.swiped = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
