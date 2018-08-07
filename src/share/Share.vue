<template>
  <div class="share">
    <div class="share-header">
      <h3>Share info with an exsisting contact, username, phone number, email, or scan a contact's Recode to start sharing</h3>
      <!-- Search Bar -->
      <el-row class="search-header" type="flex" justify="center">
        <el-col :span="22">
          <input class="search" type="te xt" placeholder="Enter Username, Name, Email, or Phone #" @focus="showContacts = true" v-model="searchInput">
          <button type="submit" class="search-btn"><icon scale="1.5" name="search"></icon></button>
        </el-col>
      </el-row>
    </div>
    <!-- Contact List -->
    <div v-if="showContacts" class="contact-list">
      <div v-if="contacts.length > 0">
        <el-row class="contact" v-for="contact in contacts" :key="contact.id" type="flex" justify="start">
          <el-col class="contact-inner" @click.native="select(contact.id)">
            <div v-if="findSelected(contact.id)" class="icon-checked"><icon name="check" scale="1.5"></icon></div>
            <div v-else>
              <img v-if="contact.thumbnail" :src="contact.thumbnail" :alt="lastName(contact.id)">
              <div v-else class="profile-pic-thumb-share-placeholder">{{ letter(contact.id) }}</div>
            </div>
            <div class="first-name">{{ firstName(contact.id) }}</div>
            <div class="last-name">{{ lastName(contact.id) }}</div>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-button class="new-share-btn" type="primary" @click="shareWithAttribute">
          <div>Share with {{ search }}</div>
        </el-button>
        <p>Separate multiple values with commas<br>(e.g. 'his@domain.com, her@domain.com, 555-555-5555')</p>
      </div>
    </div>
    <!-- QR Code & Link -->
    <div v-else class="code">
      <div id="scan" class="scan">
        <img src="../assets/Unitag_QRCode_1531164898330.png" alt="QR Code">
      </div>
      <el-button v-show="!showContacts" class="code-btn" type="primary" @click="$router.push({name: 'QRCamera'})">
        <div>Scan <icon name="camera" scale="1.25"></icon></div>
      </el-button>
      <div class="code-link">
        <el-button class="code-btn twitter" type="primary">
          <div>Invite on <icon name="twitter" scale="1.25"></icon></div>
        </el-button>
        <el-button class="code-btn facebook" type="primary">
          <div>Invite on <icon name="facebook-square" scale="1.25"></icon></div>
        </el-button>
      </div>
    </div>
    <!-- Footer -->
    <div v-if="showContacts" class="footer">
      <el-button class="white-btn" type="primary" round @click="showContacts = false; clearSelected()">Back</el-button>
      <span>{{ selectedContacts.length }} people selected</span>
    </div>
    <!-- FABs -->
    <div v-show="selectedContacts.length > 0" class="fab">
      <el-button type="primary" @click="confirmSelected"><icon scale="1.25" name="check"></icon></el-button>
      <el-button class="white-btn" type="primary" @click="clearSelected"><icon scale="1.25" name="times"></icon></el-button>
    </div>
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
    firstName (id) {
      return this.$store.getters.getContactFirstName(id)
    },
    lastName (id) {
      return this.$store.getters.getContactLastName(id)
    },
    letter (id) {
      return this.$store.getters.getContactLetter(id)
    },
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
      var sharedContacts = []
      this.selectedContacts.forEach(id => {
        sharedContacts.push(this.contacts.find(contact => contact.id === id))
      })
      this.$store.commit('setSharingContacts', sharedContacts)
      this.$router.push({name: 'Attributes'})
    },
    closeText () {},
    shareWithAttribute () {
      var contact = {
        id: undefined,
        name: undefined,
        attributes: [{ id: '1', value: this.search }]
      }
      this.$store.commit('setSharingContacts', [contact])
      this.$router.push({name: 'Attributes'})
    }
  },
  mounted () {
    this.$store.commit('setHeaderText', 'Share Your Information')
    this.$store.commit('setGlobalLoading', false)
  }
}
</script>

<style lang="scss" scoped>
  .share {
    display: flex;
    flex-direction: column;
  }
  .share-header {
    width: 100%;
    background-color: #FFFFFF;
    margin-top: -20px;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    margin-top: 0;
    width: calc(100% - 50px);
    padding: 0px 25px;
  }
  .search-header .el-col {
    display: flex;
    justify-content: center;
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
  .search:focus {
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

  // Contact List
  .contact-btn {
    margin-top: 10%;
    margin-bottom: 20px;
  }
  .contact-list {
    height: calc(100vh - 310px);
    overflow: auto;
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

  // QR Code & Link
  .code-link {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-top: solid 2px #1BBC9B;
    padding: 15px;
    margin-top: 15px;
    & .el-button {
      margin: 5px;
    }
  }
  .scan {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // Footer
  .footer {
    width: 100%;
    background-color:#1BBC9B;
    color: #FFFFFF;
    position: fixed;
    bottom: 60px;
    left: 0px;
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

  // Buttons
  .fab {
    position: fixed;
    bottom: 120px;
    right: 20px;
    & .el-button {
      border-radius: 50%;
      height: 60px;
      width: 60px;
      box-shadow: 0px 1px 5px 0px #00000038;
      z-index: 10;
    }
  }
  .code-btn {
    & div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & .fa-icon {
      margin-left: 5px;
    }
  }
  .done-btn {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
  .white-btn {
    background-color: #FFFFFF;
    color: #1BBC9B;
    border-color: #FFFFFF;
  }
  .new-share-btn {
    margin-top: 25px;
    max-width: 275px;
    & div {
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
  }

  // Social Styles
  .facebook {
    background-color: #3B5998;
    border-color: #3B5998;
  }
  .twitter {
    background-color: #08A0E9;
    border-color: #08A0E9;
  }
  .google {
    background-color: #dc4c42;
    border-color: #dc4c42;
  }
</style>

