<template>
<!-- Contacts Parent Component -->
<el-container class="contacts">
  <el-aside class="nav" width="250px" height="100%" :style="{ display: navVisible }">
    <re-nav :setNavVisible="setNavVisible"></re-nav>
  </el-aside>
  <el-container>
    <el-header>
    <el-row type="flex" justify="left" :style="{ display: headVisible }">
      <el-col :span="2"><icon class="nav-btn" :style="{ display: navBtnVisible }" name="bars" @click.native="setNavVisible" scale="2.5"></icon></el-col>
      <el-col :span="2"></el-col>
      <el-col :xs="20" :sm="20" :md="16" :lg="12" :xl="12">
        <el-input
        placeholder="Search Contacts & Groups"
        suffix-icon="search"
        v-model="searchInput">
          <template slot="prepend"><icon name="search"></icon></template>
        </el-input>
      </el-col>
    </el-row>
    </el-header>
    <el-main>
      <re-contact v-for="contact in contacts" :contact="contact" :headVisible="headVisible" :key="contact.id"></re-contact>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Contact from './Contact.vue'
import Nav from '../../navigation/components/Nav.vue'

export default {
  // props: ['contact'],
  data () {
    return {
      searchInput: '',
      contacts: [
        {
          id: '1',
          firstName: 'Luke',
          lastName: 'Skywalker',
          group: 'Heroes',
          pic: require('../../assets/luke.png')
        },
        {
          id: '2',
          firstName: 'Darth',
          lastName: 'Vader',
          group: 'Villains',
          pic: require('../../assets/vader.png')
        },
        {
          id: '3',
          firstName: 'Han',
          lastName: 'Solo',
          group: 'Smugglers',
          pic: require('../../assets/han.png')
        },
        {
          id: '4',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../../assets/revan.png')
        },
        {
          id: '5',
          firstName: 'Bastilla',
          lastName: 'Shan',
          group: 'Jedi',
          pic: require('../../assets/bastilla.png')
        },
        {
          id: '6',
          firstName: '',
          lastName: 'Finn',
          group: 'Heroes',
          pic: require('../../assets/finn.png')
        },
        {
          id: '7',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../../assets/revan.png')
        },
        {
          id: '8',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../../assets/revan.png')
        },
        {
          id: '9',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../../assets/revan.png')
        },
        {
          id: '10',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../../assets/revan.png')
        }
      ],
      navVisible: '',
      headVisible: '',
      navBtnVisible: ''
    }
  },
  components: {
    'reContact': Contact,
    'reNav': Nav
  },
  methods: {
    setNavVisible () {
      if (this.navVisible === 'block') {
        this.headVisible = ''
        this.navVisible = 'none'
        this.navBtnVisible = 'block'
      } else if (this.navVisible === '' && window.innerWidth >= 1000) {
        this.navVisible = 'none'
        this.navBtnVisible = 'block'
      } else {
        if (window.innerWidth < 1000) {
          this.headVisible = 'none'
          this.navVisible = 'block'
        } else {
          this.navVisible = 'block'
          this.navBtnVisible = 'none'
        }
      }
    }
  }
}
</script>

<style scoped>
  .el-header {
    padding-top: 10px;
  }
  .contacts {
    text-align: center;
  }
  .nav-btn {
    color: #1BBC9B;
    transition: all .30s ease;
    float: left;
  }
  .nav-btn:hover {
    cursor: pointer;
    color: #0be8ba;
  }
  .nav {
    padding-top: 10px;
    background-color: #1BBC9B;
    text-align: left;
    display: none;
  }
  @media (min-width: 1000px) {
    .nav {
      display: block;
    }
    .nav-btn {
      display: none;
    }
  }
</style>