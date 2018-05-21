<template>
  <div>
    <re-contact v-for="contact in contacts" :contact="contact" :key="contact.id"></re-contact>
  </div>
</template>

<script>
import Contact from './Contact.vue'

export default {
  components: {
    'reContact': Contact
  },
  computed: {
    contacts () {
      return this.$store.state.contacts
    }
  }
}
</script>

<style lang="scss" scoped>
.action-btns {
  margin-top: 5px;
  color: #1BBC9B;
}
</style>


