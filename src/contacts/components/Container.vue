<template>
<div>
  <!-- Contacts Parent Component -->
  <re-header class="reheader" :nav="navVisible" :setNavVisible="setNavVisible"></re-header>
  <re-nav :nav="navVisible" :setNavVisible="setNavVisible"></re-nav>
  <div is="sui-container"  class="contactContainer">
    <re-contact v-for="contact in contacts" :key="contact.id" class="recontact">
      <sui-grid>
        <sui-grid-row class="contact">
          <sui-grid-column :width="4" text-align="right">
            <img :src="contact.pic">
          </sui-grid-column>
          <sui-grid-column :width="12" text-align="left">
            <span>{{ contact.firstName + ' '}}</span>
            <span class="prim-col">{{ contact.lastName }}</span>
            <br>
            <span class="g-name">{{ contact.group }}</span>
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>
    </re-contact>
  </div>
</div>
</template>

<script>
// import Contact from '@/contacts/components/Contact'

import Contact from './Contact.vue'
import Header from './Header.vue'
import Nav from '../../navigation/components/Nav.vue'

export default {
  data () {
    return {
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
        }
      ],
      navVisible: false
    }
  },
  components: {
    'reContact': Contact,
    'reHeader': Header,
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
  #search {
    text-align: right;
    display: block;
  }
  /* .reheader {
    position: fixed;
  } */
  .contactContainer {
    /* background-color: burlywood; */
    text-align: left;
    padding-top: 25px;
    padding-left: 15px;
  }

  .contactContainer img {
    /* border-radius: 30%; */
    width: 80px;
  }

  .prim-col {
    color: #1BBC9B;
  }

  .recontact {
    padding-bottom: 20px;
    font-family: Sanchez;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 24px;
  }

  .g-name {
    padding: 1px 5px;
    background-color: #1BBC9B;
  }

  .contact {
    margin: 5px;
    padding: 0px;
  }

  .contact:hover {
    background-color: burlywood;
    cursor: pointer;
  }
</style>