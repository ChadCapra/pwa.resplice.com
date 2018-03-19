<template>
<div>
  <!-- Contacts Parent Component -->
  <header>
    <section>
      [Icon-Nav]
    </section>
    <span id="search">
      <input type="text" placeholder="Search contacts & groups">
    </span>
    <table>
    </table>
  </header>
</div>
</template>

<script>
// import Contact from '@/contacts/components/Contact'

import Contact from './Contact.vue'

export default {
  components: {
    'contact': Contact
  }
}
</script>

<style>
#search {
  text-align: right;
  display: block;
}
</style>