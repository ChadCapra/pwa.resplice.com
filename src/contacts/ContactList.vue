<template>
  <div>
    <el-button class="action-btn" type="primary" size="small" round><icon name="bars"></icon></el-button>
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
.action-btn {
  float: right;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  }
}
</style>


