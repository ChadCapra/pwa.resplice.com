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
  data () {
    return {
      contacts: [
        {
          id: '1',
          firstName: 'Luke',
          lastName: 'Skywalker',
          group: 'Heroes',
          pic: require('../assets/luke.png')
        },
        {
          id: '2',
          firstName: 'Darth',
          lastName: 'Vader',
          group: 'Villains',
          pic: require('../assets/vader.png')
        },
        {
          id: '3',
          firstName: 'Han',
          lastName: 'Solo',
          group: 'Smugglers',
          pic: require('../assets/han.png')
        },
        {
          id: '4',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        },
        {
          id: '5',
          firstName: 'Bastilla',
          lastName: 'Shan',
          group: 'Jedi',
          pic: require('../assets/bastilla.png')
        },
        {
          id: '6',
          firstName: 'Finn',
          lastName: '',
          group: 'Heroes',
          pic: require('../assets/finn.png')
        },
        {
          id: '7',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        },
        {
          id: '8',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        },
        {
          id: '9',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        },
        {
          id: '10',
          firstName: 'Darth',
          lastName: 'Revan',
          group: 'Villains',
          pic: require('../assets/revan.png')
        }
      ]
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


