<template>
<!-- Contacts Parent Component -->
<el-container class="contacts">
  <el-header height="55px">
    <re-header></re-header>
  </el-header>
  <el-main>
    <re-contact v-for="contact in contacts" :contact="contact" :headVisible="headVisible" :key="contact.id"></re-contact>
  </el-main>
  <el-footer>
    <re-footer></re-footer>
  </el-footer>
</el-container>
</template>

<script>
import Contact from './Contact.vue'
import Nav from '../navigation/Nav.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  // props: ['contact'],
  data () {
    return {
      contacts: [
        {
          id: '1',
          firstName: 'Luke',
          lastName: 'Skywalker',
          group: 'Heroes',
          pic: require('../assets/luke.png')
        },
        {
          id: '2',
          firstName: 'Darth',
          lastName: 'Vader',
          group: 'Villains',
          pic: require('../assets/vader.png')
        },
        {
          id: '3',
          firstName: 'Han',
          lastName: 'Solo',
          group: 'Smugglers',
          pic: require('../assets/han.png')
        },
        {
          id: '4',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        },
        {
          id: '5',
          firstName: 'Bastilla',
          lastName: 'Shan',
          group: 'Jedi',
          pic: require('../assets/bastilla.png')
        },
        {
          id: '6',
          firstName: 'Finn',
          lastName: '',
          group: 'Heroes',
          pic: require('../assets/finn.png')
        },
        {
          id: '7',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        },
        {
          id: '8',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        },
        {
          id: '9',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        },
        {
          id: '10',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        }
      ],
      navVisible: '',
      headVisible: '',
      navBtnVisible: ''
    }
  },
  components: {
    'reContact': Contact,
    'reNav': Nav,
    'reHeader': Header,
    'reFooter': Footer
  },
  methods: {
  }
}
</script>

<style scoped>
  .el-header {
    padding-top: 10px;
    background-color: #32393d;
    /* background-image: linear-gradient(bottom, #35495E 50%, #32393d 50%);
    background-image: -o-linear-gradient(bottom, #35495E 50%, #32393d 50%);
    background-image: -moz-linear-gradient(bottom, #35495E 50%, #32393d 50%);
    background-image: -webkit-linear-gradient(bottom, #35495E 50%, #32393d 50%); */
  }
  .el-footer {
    background-color: #32393D;
    padding-left: 5px;
    padding-right: 5px;
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