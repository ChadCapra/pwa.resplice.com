<template>
  <div>
    <re-contact v-for="contact in groupContacts" :contact="contact" :key="contact.id"></re-contact>
  </div>
</template>

<script>
import Contact from './Contact.vue'

export default {
  components: {
    'reContact': Contact
  },
  computed: {
    groupContacts () {
      let group = this.$store.getters.getGroupById(this.$route.params.id)
      return this.$store.getters.getGroupContacts(group.memberIds)
    }
  }
}
</script>

