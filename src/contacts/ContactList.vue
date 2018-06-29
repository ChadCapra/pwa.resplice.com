<template>
  <div v-if="loading">
    <re-loading></re-loading>
  </div>
  <div v-else>
    <div v-if="contacts.length > 0">
      <re-contact v-for="contact in contacts" :contact="contact" :key="contact.id"></re-contact>
    </div>
    <div class="no-contact" v-else>
      <p>You have no one sharing their attributes with you 😰</p>
      <p>Share your attributes with more people to get shares back!</p>
      <el-button type="primary" @click="$router.push({name: 'Share'})">Share</el-button>
    </div>
  </div>
</template>

<script>
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
  computed: {
    contacts () {
      if (this.search) {
        return this.$store.getters.getFilteredContacts(this.search)
      } else {
        return this.$store.getters.getContacts
      }
    },
    search () {
      return this.$store.getters.getSearchInput
    },
    loading () {
      return this.$store.getters.getContactsLoading
    }
  },
  created () {
    this.$store.state.header.showSearch = true
  }
}
</script>

<style lang="scss" scoped>
</style>
