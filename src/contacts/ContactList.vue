<template>
  <div v-if="loading" class="loading">
    <re-loading></re-loading>
  </div>
  <div v-else class="contact-list">
    <div v-if="contacts.length > 0">
      <re-contact 
        v-for="contact in contacts"
        :selected="isSelected(contact.id)"
        :actions="selectedContacts.length > 0"
        :contact="contact"
        :key="contact.id"
        @selected="handleSelected(contact.id)">
      </re-contact>
    </div>
    <div class="no-contact" v-else>
      <p>You have no one sharing their attributes with you or we couldn't find that person while searching 😰</p>
      <p>Share your attributes with more people to get shares back!</p>
      <el-button type="primary" round @click="$router.push({name: 'Share'})">Share</el-button>
    </div>
    <el-row v-show="selectedContacts.length > 0" class="action-menu" type="flex" justify="center">
      <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" @click.native="selectAll" class="action-item alt">
        <icon name="check" scale="2"></icon>
      </el-col>
      <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" class="action-item">
        <icon name="phone" scale="2"></icon>
      </el-col>
      <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" class="action-item">
        <icon name="envelope" scale="2"></icon>
      </el-col>
      <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" class="action-item" @click.native="mapView">
        <icon name="map" scale="2"></icon>
      </el-col>
      <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="2" @click.native="clearSelected" class="action-item alt">
        <icon name="times" scale="2"></icon>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListLoading from '@/skeleton/ListLoading.vue'

export default {
  components: {
    're-contact': () => ({
      component: import('./Contact.vue'),
      loading: ListLoading,
      delay: 100
    }),
    're-loading': ListLoading
  },
  data () {
    return {
      selectedContacts: []
    }
  },
  computed: {
    ...mapGetters({
      allContacts: 'getAllContacts',
      filteredContacts: 'getFilteredContacts',
      search: 'getSearchInput',
      loading: 'getGlobalLoading'
    }),
    contacts () {
      if (this.search) {
        return this.filteredContacts(this.search)
      } else {
        return this.allContacts
      }
    }
  },
  methods: {
    isSelected (id) {
      return this.selectedContacts.includes(id)
    },
    handleSelected (id) {
      var index = this.selectedContacts.indexOf(id)
      if (index >= 0) {
        this.selectedContacts.splice(index, 1)
      } else {
        this.selectedContacts.push(id)
      }
    },
    clearSelected () {
      this.selectedContacts = []
    },
    selectAll () {
      this.contacts.forEach(contact => { this.selectedContacts.push(contact.id) })
    },
    mapView () {
      this.$store.dispatch('buildMap', this.selectedContacts)
      this.$router.push({name: 'Map'})
    }
  },
  created () {
    this.$store.commit('setShowSearch', true)
    this.$store.commit('setHeaderText', 'Resplice')
    this.$store.dispatch('refresh')
      .then(contacts => {
        this.$store.commit('setContacts', contacts)
        this.$store.commit('buildSearchableAttributes')
        this.$store.commit('setGlobalLoading', false)
        console.log('Refreshed app')
      })
      .catch(error => {
        console.log(error)
      })
  },
  destroyed () {
    this.$store.commit('setShowSearch', false)
  }
}
</script>

<style lang="scss" scoped>
  .action-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #1BBC98;
    z-index: 10;
    color: #FFFFFF;
    & .fa-icon {
      padding-top: 15px;
    }
  }
  .action-item {
    &:hover {
      cursor: pointer;
      background-color: #46D6B6;
    }
  }
  .alt {
    background-color: #32393D;
    color: #1BBC98;
    &:hover {
      background-color: #1D1F21;
    }
  }
</style>
