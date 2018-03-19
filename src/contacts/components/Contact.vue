<template>
<div>
    <!-- Not sure if I want to make a seperate component for a contact -->
    <h1>Here is a single contact</h1>
</div>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      firstName: 'Luke',
      lastName: 'Skywalker',
      groupName: 'Heroes'
    }
  },
  methods: {
    enterProfile () {
      // This function should be called when someone taps on a contact.
      console.log('Enter profile function')
    }
  }
}
</script>

<style>
</style>