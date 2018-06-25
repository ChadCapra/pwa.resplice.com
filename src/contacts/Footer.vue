<template>
  <el-row class="nav-tabs" type="flex" justify="center">
    <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" :class="{ 'active-nav': index.one }" @click.native="changeIndex('one')" class="tab">
      <router-link to="/"><div class="r-link"><icon name="address-book" scale="2"></icon></div></router-link>
    </el-col>
    <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" :class="{ 'active-nav': index.two }" @click.native="changeIndex('two')" class="tab">
      <router-link to="/groups"><div class="r-link"><icon name="users" scale="2"></icon></div></router-link>
    </el-col>
    <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" :class="{ 'active-nav': index.three }" @click.native="changeIndex('three')" class="tab">
      <router-link to="/map"><div class="r-link"><icon name="map" scale="2"></icon></div></router-link>
    </el-col>
    <!-- <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" :class="{ 'active-nav': index.four }" @click.native="changeIndex('four')" class="tab">
      <router-link to="/userprofile"><div class="r-link"><icon name="user" scale="2"></icon></div></router-link>
    </el-col> -->
    <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" :class="{ 'active-nav': index.four }" @click.native="changeIndex('four')" class="tab">
      <router-link to="/settings"><div class="r-link"><icon name="cog" scale="2"></icon></div></router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed: {
    index () {
      return this.$store.getters.getNavIndex
    }
  },
  methods: {
    changeIndex (pos) {
      this.$store.commit('changeNavIndex', pos)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-tabs {
  height: 60px;
}
.fa-icon {
  color: white;
  padding-top: 15px;
}
.tab {
  outline: 0;
  transition: all 0.5s ease;
}
.tab:hover {
  background-color: #1d1f21;
  cursor: pointer;
}
.active-nav {
  color: #1BBC9B;
  background-color: #1d1f21;
  border-bottom: 3px solid #1BBC9B;
}
.r-link {
  width: 100%;
  height: 100%;
}
</style>


