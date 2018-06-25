<template>
  <div v-if="loading">
    <re-loading></re-loading>
  </div>
  <div v-else>
    <div v-if="contacts">
      <re-contact v-for="contact in contacts" :contact="contact" :key="contact.id"></re-contact>
    </div>
    <div v-else>You have no contacts</div>
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
  }
}
</script>

<style lang="scss" scoped>
</style>
