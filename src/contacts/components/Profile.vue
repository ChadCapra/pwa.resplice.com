<template>
  <div>
    <p>Profile View</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        firstName: 'Luke',
        lastName: 'Skywalker',
        group: 'Heroes',
        personal: {
          emails: [
            'lukesky@rebels.com',
            'lukesky@heroes.com'
          ],
          phones: [
            '333-333-3333',
            '999-999-9999'
          ]
        },
        work: {
          emails: ['lukesky@tatooine.com'],
          phones: ['123-456-7890']
        }
      }
    }
  }
}
</script>

<style>
</style>


