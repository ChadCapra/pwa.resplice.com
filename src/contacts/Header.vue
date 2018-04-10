<template>
  <div>
    <el-row>
      <icon class="back-btn btn" name="arrow-left" scale="2"></icon>
      <transition name="fade" mode="out-in">
        <span v-if="searchState" class="group">Group Name - 100</span>
      </transition>
      <label :data-state="search" for="search">
        <input type="text" placeholder="Search" @click="searchOn" @blur="searchOff"/>
        <icon name="search" aria-hidden="true"></icon>
      </label>
    </el-row>
    <el-row class="search">
      <el-col :xs="18" :sm="18" :md="12" :lg="12" :xl="12">
        <!-- <el-input
          placeholder="Search for contact, tag, or group"
          v-model="searchInput"
          clearable>
          <icon slot="prefix" scale="1.5" class="el-input__icon search-icon" name="search"></icon>
        </el-input> -->
      </el-col>
      <el-button class="action-btn" type="primary" size="small" round><icon name="bars"></icon></el-button>
    </el-row>
    <!-- <el-row class="action-btns" type="flex" justify="center">
      <el-col :xs="6" :sm="6" :md="6" :lg="4" :xl="2"><icon class="action-btn" name="phone" scale="2"></icon></el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="4" :xl="2"><icon class="action-btn" name="envelope" scale="2"></icon></el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="4" :xl="2"><icon class="action-btn" name="comment" scale="2"></icon></el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="4" :xl="2"><icon class="action-btn" name="search" scale="2"></icon></el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchInput: '',
      searchState: true,
      search: 'close'
    }
  },
  methods: {
    searchOn () {
      this.searchState = !this.searchState
      this.search = 'open'
    },
    searchOff () {
      this.searchState = !this.searchState
      this.search = 'close'
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  margin-bottom: 10px;
  color: #fff;
  font-size: 28px;
}
.action-btns {
  margin-top: 5px;
  color: #1BBC9B;
}
.action-btn {
  float: right;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.05);
  box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  }
}
.btn {
  color: #1BBC9B;
  transition: all .30s ease;
  &:hover {
    color: #0be8ba;
    cursor: pointer;
    transform: scale(1.05);
  }
}
.profile-btn {
  color: #1BBC9B;
  float: right;
}
.back-btn {
  float: left;
  color: #1BBC9B;
}
.search-icon {
  color: #1BBC9B;
  padding-right: 3px;
}
.search {
  margin-top: 16px;
}
label{
  float: right;
  position: relative;
  background-color: #fff;
  padding: 5px 12px;
  transition: all 0.5s ease;
  border-radius: 0;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
  &::after{
    content: '';
    display: block;
    height: 2px;
    width: 80%;
    background-color: #1BBC9B;
    transition: all 0.5s ease 0.5s;
  }
  input{
    transition: width 0.5s ease, opacity 0.5s ease 0.5s;
    opacity: 1;
    width: 200px;
    height: 25px;
    border: 0;
    outline: none;
    color: darken(#1BBC9B, 25)
  }
  .fa-icon{
    position: absolute;
    top: 11px;
    right: 11px;
    color: #1BBC9B;
    cursor: pointer;
  }
  &[data-state='close']{
    background-color: #1BBC9B;
    border-radius: 30px;
    padding: 5px 5px;
    transition: all 0.5s ease;
    &::after{
      width: 0%;
      transition: all 0.3s ease;
    }
    .fa-icon{
      pointer-events: none;
      color: #fff;
    }
    input{
      width: 28px;
      height: 25px;
      opacity:0;
      cursor: pointer;
      transition: opacity 0.5s ease, width 0.5s ease;
      -webkit-appearance:none
    } 
  }
}
label:hover {
  transform: scale(1.05);
  box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
}
.fade-enter-active, .fade-leave-active {
  position: absolute;
  z-index: -10;
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>