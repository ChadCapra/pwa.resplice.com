<template>
<!-- Contacts Parent Component -->
<el-container class="contacts">
  <!-- <el-aside width="200px">Aside <icon name="bars" label="Navigation"></icon></el-aside> -->
  <el-container>
    <el-header>
    <el-row type="flex" justify="center">
      <el-col :span="2"><icon class="nav" name="bars" scale="2.5"></icon></el-col>
      <el-col :span="2"></el-col>
      <el-col :xs="20" :sm="20" :md="16" :lg="6" :xl="6">
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
      <re-contact v-for="contact in contacts" :contact="contact" :key="contact.id"></re-contact>
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
        }
      ],
      navVisible: false
    }
  },
  components: {
    'reContact': Contact,
    'reNav': Nav
  },
  methods: {
    setNavVisible () {
      if (this.navVisible) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
    }
  }
}
</script>

<style>
  .el-header {
    padding-top: 10px;
  }
  .contacts {
    text-align: center;
  }
  .nav {
    color: #1BBC9B;
  }
</style>