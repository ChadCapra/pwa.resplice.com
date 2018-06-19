<template>
  <div v-if="contacts">
    <re-contact v-for="contact in contacts" :contact="contact" :key="contact.id"></re-contact>
  </div>
  <div v-else>You have no contacts</div>
</template>

<script>
import ListLoading from '@/skeleton/ListLoading.vue'

export default {
  components: {
    're-contact': () => ({
      component: import('./Contact.vue'),
      loading: ListLoading,
      delay: 100
    })
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
