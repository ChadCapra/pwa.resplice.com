<template>
  <div>
    <el-row align="middle" justify="space-between">
      <icon v-if="showBack" class="back-btn btn" name="arrow-left" scale="2" @click.native="$router.go(-1)"></icon>
      <transition name="fade" mode="out-in">
        <span v-if="searchDisabled" class="header-text">{{ headerText }}</span>
      </transition>
      <label v-if="showSearch" :data-state="search" for="search">
        <input type="text" v-model="searchInput" placeholder="Search" @click="searchOn" @blur="searchOff"/>
        <icon name="search" aria-hidden="true"></icon>
      </label>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchDisabled: true,
      search: 'close',
      searchText: ''
    }
  },
  methods: {
    searchOn () {
      this.searchDisabled = false
      this.search = 'open'
    },
    searchOff () {
      this.searchDisabled = true
      this.search = 'close'
    }
  },
  computed: {
    showSearch () {
      return this.$store.state.header.showSearch
    },
    showBack () {
      return this.$store.state.header.showBack
    },
    headerText () {
      return this.$store.state.header.text
    },
    searchInput: {
      get () {
        return this.searchText
      },
      set (text) {
        this.searchText = text
        text = text.replace(/\s/g, '').toLowerCase()
        this.$store.commit('updateSearch', text)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  color: #1BBC9B;
  transition: all .30s ease;
  &:hover {
    color: #0be8ba;
    cursor: pointer;
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
.header-text {
    margin-bottom: 10px;
    color: #fff;
    font-size: 28px;
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