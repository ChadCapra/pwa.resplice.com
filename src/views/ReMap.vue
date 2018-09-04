<template>
<keep-alive>
  <el-container>
    <el-header>
      <el-row align="top" justify="space-between">
        <el-col :xs="6" :sm="4" :md="2" :lg="2" :xl="2">
          <icon class="exit-btn" name="arrow-left" scale="2" @click.native="$router.go(-1)"></icon>
        </el-col>
        <el-col :xs="12" :sm="18" :md="20" :lg="20" :xl="20">
          <span>Map</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div v-if="mapLoading" class="map-loading"></div>
      <google-map v-else name="resplice"></google-map>
    </el-main>
  </el-container>
</keep-alive>
</template>

<script>
import GoogleMaps from '@/components/contacts/GoogleMaps.vue'

export default {
  components: {
    'google-map': GoogleMaps
  },
  computed: {
    mapLoading () {
      return this.$store.getters.getMapLoading
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-header {
    padding-top: 13px;
    font-size: 28px;
    background-color: #32393d;
    color: #fff;
  }
  .map-loading {
    background-color: grey;
    width: 100%;
    height: 100%;
  }
  .exit-btn {
    float: left;
    color: #1BBC9B;
    transition: all .30s ease;
    &:hover {
      color: #0be8ba;
      cursor: pointer;
    }
  }
</style>


