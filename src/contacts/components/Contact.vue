<template>
<div>
    <!-- Not sure if I want to make a seperate component for a contact -->
    <slot></slot>
</div>
</template>

<script>
export default {
  // props: ['key'],
  data () {
    return {
      id: '1',
      firstName: 'Luke',
      lastName: 'Skywalker',
      group: 'Heroes',
      profilePic: './path/to/pic'
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