<template>
  <div class="share">
    <!-- Search Bar fixed -->
    <el-row class="header" type="flex" justify="center">
      <el-col class="search-header" :span="19">
        <input class="search" type="text" placeholder="Search" @focus="showContacts = true" v-model="searchInput">
        <button type="submit" class="search-btn"><icon scale="1.5" name="search"></icon></button>
      </el-col>
    </el-row>
    <!-- Contact List -->
    <div v-if="showContacts" class="contact-list">
      <el-row class="contact" v-for="contact in contacts" :key="contact.id" type="flex" justify="start">
        <el-col class="contact-inner" @click.native="select(contact.id)">
          <div v-if="findSelected(contact.id)" class="icon-checked"><icon name="check" scale="1.5"></icon></div>
          <img v-else :src="contact.thumbnail" :alt="contact.first_name + ' ' + contact.last_name">
          <div class="first-name">{{ contact.first_name }}</div>
          <div class="last-name">{{ contact.last_name }}</div>
        </el-col>
      </el-row>
    </div>
    <!-- Platforms -->
    <div v-else class="platform">
      <div class="platform-header">
        <h1>Share Your Information</h1>
        <h3>Search for Resplice contacts or select a platform to get started.</h3>
      </div>
      <div class="platforms">
        <el-button class="platform-btn" type="primary" round @click="handlePlatform(1)"><div><icon name="comment"></icon>Text</div></el-button>
        <el-button class="platform-btn" type="primary" round @click="handlePlatform(2)"><div><icon name="envelope"></icon>Email</div></el-button>
        <el-button class="platform-btn facebook" round @click="handlePlatform(3)"><div><icon name="facebook-square"></icon>Facebook</div></el-button>
        <el-button class="platform-btn twitter" round @click="handlePlatform(4)"><div><icon name="twitter"></icon>Twitter</div></el-button>
        <el-button class="platform-btn google" round @click="handlePlatform(5)"><div><icon name="google"></icon>Google</div></el-button>
        <el-button class="platform-btn" type="info" round @click="handlePlatform(6)"><div><icon name="link"></icon>Link</div></el-button>
      </div>
      <el-button class="contact-btn" type="primary" plain @click="showContacts = true"><icon name="sort-down"></icon> View Resplice Contacts</el-button>
    </div>
    <!-- Footer -->
    <div v-if="showContacts" class="footer">
      <el-button type="primary" plain @click="showContacts = false; clearSelected()">Back</el-button>
      <span>{{ selectedContacts.length }}/{{ length }} contacts selected</span>
    </div>
    <div v-else class="done-btn">
      <el-button type="primary" @click="$router.push({name: 'root'})">Done</el-button>
    </div>
    <!-- FABs -->
    <div v-show="selectedContacts.length > 0" class="fab">
      <el-button type="success" @click="confirmSelected"><icon scale="1.25" name="check"></icon></el-button>
      <el-button type="danger" @click="clearSelected"><icon scale="1.25" name="times"></icon></el-button>
    </div>
    <!-- Text Dialog -->
    <el-dialog
      title="Text"
      :visible.sync="showText"
      width="50%"
      :before-close="closeText">
      <span>Enter phone numbers separated by a comma</span>
    </el-dialog>
    <!-- Email Dialog -->

    <!-- Link Dialog -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      showContacts: false,
      selectedContacts: [],
      searchText: '',
      showText: false,
      showEmail: false,
      showLink: false
    }
  },
  computed: {
    ...mapGetters({ length: 'getContactCount' }),
    searchInput: {
      get () {
        return this.searchText
      },
      set (text) {
        this.searchText = text
        text = text.replace(/\s/g, '').toLowerCase()
        this.$store.commit('updateSearch', text)
      }
    },
    contacts () {
      if (this.search) {
        return this.$store.getters.getFilteredContacts(this.search)
      } else {
        return this.$store.getters.getContacts
      }
    },
    search () {
      return this.$store.getters.getSearchInput
    }
  },
  methods: {
    handlePlatform (id) {
      switch (id) {
        case 1:
          console.log('Text')
          break
        case 2:
          console.log('Email')
          break
        case 3:
          console.log('Facebook')
          break
        case 4:
          console.log('Twitter')
          break
        case 5:
          console.log('Google')
          break
        case 6:
          console.log('Link')
          break
      }
    },
    findSelected (id) {
      return this.selectedContacts.includes(id)
    },
    select (id) {
      if (!this.findSelected(id)) {
        this.selectedContacts.push(id)
      } else {
        var index = this.selectedContacts.indexOf(id)
        this.selectedContacts.splice(index, 1)
      }
    },
    clearSelected () {
      this.selectedContacts = [] // reset selected contacts
    },
    confirmSelected () {
      // Confirm selected contacts and move to the attributes page
      this.$store.dispatch('setSharingContacts', this.selectedContacts)
      this.$router.push({name: 'Attributes'})
    },
    closeText () {}
  }
}
</script>

<style lang="scss" scoped>
  .share {
    display: flex;
    flex-direction: column;
    padding: 0 0 20px 0;
    height: 100vh;
  }
  .platform {
    margin: 75px 0 50px 0;
  }
  .platforms {
    display: flex;
    flex-direction: column;
  }
  .platform-btn {
    margin: 0 25px 10px 25px;
    font-size: 14px;
    color: white;
    & .fa-icon {
      margin-right: 10px;
    }
    & div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .facebook {
    background-color: #3B5998;
  }
  .twitter {
    background-color: #08A0E9;
  }
  .google {
    background-color: #dc4c42;
  }
  .search {
    width: 80%;
    border: 3px solid #1BBC9B;
    padding: 5px;
    height: 25px;
    border-radius: 5px;
    outline: none;
    color: #9DBFAF;
  }
  .search-header {
    display: flex;
    justify-content: center;
  }
  .search:focus {
    font-weight: 900;
    color: #1BBC9B;
  }
  .search-btn {
    border: 1px solid #1BBC9B;
    background: #1BBC9B;
    text-align: center;
    color: #FFFFFF;
    border-radius: 5px;
    margin-left: -10px;
    height: 41px;
    cursor: pointer;
  }
  .contact-btn {
    margin-top: 10%;
    margin-bottom: 20px;
  }
  .header {
    min-height: 41px;
    position: fixed;
    width: 100%;
    background-color: #FFF;
    z-index: 10;
    padding-top: 15px;
  }
  .contact-list {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .contact {
    margin: 15px 0px 15px 20px;
  }
  .contact-inner {
    display: flex;
    align-items: center;
    & img {
      max-height: 50px;
      max-width: 50px;
    }
  }
  .first-name {
    margin-left: 5px;
  }
  .last-name {
    margin-left: 3px;
    color: #1BBC9B;
  }
  .icon-checked {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color:#1BBC9B;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer {
    width: 100%;
    background-color:#1BBC9B;
    color: #FFFFFF;
    position: fixed;
    bottom: 0px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    & span {
      flex-grow: 1;
    }
    & .el-button {
      margin-left: 10px;
    }
  }
  .fab {
    position: fixed;
    bottom: 75px;
    right: 20px;
    & .el-button {
      border-radius: 50%;
      height: 60px;
      width: 60px;
      box-shadow: 0px 1px 5px 0px black;
      z-index: 10;
    }
  }
  .done-btn {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>

