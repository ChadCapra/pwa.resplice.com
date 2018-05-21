import Vue from 'vue'
import Vuex from 'vuex'
// import contacts from './modules/contacts'
// import group from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      {
        id: '1',
        firstName: 'Luke',
        lastName: 'Skywalker',
        profilePic: require('../assets/luke.png'),
        attributes: [
          {
            id: '1',
            contact_id: '1',
            attribute_group_id: '1',
            type: 'personal',
            value: '999-999-9999',
            verified: true,
            primary_of_type: false
          },
          {
            id: '2',
            contact_id: '1',
            attribute_group_id: '3',
            type: 'personal',
            value: '1176 14th Ave SE Minneapolis, MN 55414',
            verified: true,
            primary_of_type: false
          },
          {
            id: '3',
            contact_id: '1',
            attribute_group_id: '1',
            type: 'work',
            value: '555-555-5555',
            verified: true,
            primary_of_type: true
          },
          {
            id: '4',
            contact_id: '1',
            attribute_group_id: '2',
            type: 'work',
            value: 'luke@rebels.com',
            verified: false,
            primary_of_type: false
          }
        ]
      },
      {
        id: '5',
        firstName: 'Bastilla',
        lastName: 'Shan',
        profilePic: require('../assets/bastilla.png'),
        attributes: [
          {
            id: '1',
            contact_id: '5',
            attribute_group_id: '2',
            type: 'work',
            value: 'shan@darkside.com',
            verified: false,
            primary_of_type: true
          },
          {
            id: '2',
            contact_id: '5',
            attribute_group_id: '4',
            type: 'twitter',
            value: '@bastillashan',
            verified: true,
            primary_of_type: true
          }
        ]
      },
      {
        id: '2',
        firstName: 'Darth',
        lastName: 'Vader',
        profilePic: require('../assets/vader.png'),
        attributes: [
          {
            id: '1',
            contact_id: '2',
            attribute_group_id: '1',
            type: 'personal',
            value: '678-444-2345',
            verified: false,
            primary_of_type: true
          }
        ]
      },
      {
        id: '3',
        firstName: 'Han',
        lastName: 'Solo',
        profilePic: require('../assets/han.png'),
        attributes: [
          {
            id: '1',
            contact_id: '3',
            attribute_group_id: '2',
            type: 'work',
            value: 'han@heroes.com',
            verified: false,
            primary_of_type: true
          }
        ]
      },
      {
        id: '4',
        firstName: 'Darth',
        lastName: 'Revan',
        profilePic: require('../assets/revan.png'),
        attributes: [
          {
            id: '1',
            contact_id: '4',
            attribute_group_id: '2',
            type: 'personal',
            value: 'revan@darkside.com',
            verified: false,
            primary_of_type: true
          }
        ]
      },
      {
        id: '6',
        firstName: 'Finn',
        lastName: null,
        profilePic: require('../assets/finn.png'),
        attributes: [
          {
            id: '1',
            contact_id: '6',
            attribute_group_id: '3',
            type: 'work',
            value: '111 Saber Ln, Jabi Town, Coruscant, Core',
            verified: false,
            primary_of_type: true
          }
        ]
      },
      {
        id: '7',
        firstName: 'Anakin',
        lastName: 'Skywalker',
        profilePic: require('../assets/anakin.png'),
        attributes: [
          {
            id: '1',
            contact_id: '7',
            attribute_group_id: '3',
            type: 'personal',
            value: '5344 JarJar St, Inner City, Naboo, Mid Rim',
            verified: false,
            primary_of_type: true
          }
        ]
      },
      {
        id: '8',
        firstName: 'Obi-wan',
        lastName: 'Kenobi',
        profilePic: require('../assets/obi-wan.png'),
        attributes: [
          {
            id: '1',
            contact_id: '8',
            attribute_group_id: '2',
            type: 'personal',
            value: 'obitheman@jtemple.com',
            verified: false,
            primary_of_type: true
          }
        ]
      },
      {
        id: '9',
        firstName: 'Mace',
        lastName: 'Windu',
        profilePic: require('../assets/mace.png'),
        attributes: [
          {
            id: '1',
            contact_id: '9',
            attribute_group_id: '1',
            type: 'work',
            value: '908-489-1564',
            verified: false,
            primary_of_type: true
          }
        ]
      }
    ],
    attributeGroups: [
      {
        id: '1',
        group: 'phone',
        isUnique: false,
        attributes: []
      },
      {
        id: '2',
        group: 'email',
        isUnique: true,
        attributes: []
      },
      {
        id: '3',
        group: 'address',
        isUnique: false,
        attributes: []
      },
      {
        id: '4',
        group: 'social',
        isUnique: true,
        attributes: []
      }
    ],
    groups: [
      {
        owner_id: '1',
        name: 'family',
        description: 'All my family',
        shared: false,
        editable: false
      }
    ]
  },
  getters: {
    getContactById: state => id => {
      return state.contacts.find(contact => contact.id === id)
    },
    getAttributes: (state, getters) => id => {
      return getters.getContactById(id).attributes
    },
    getContactId: (state, getters) => id => {
      return getters.getContactById(id).id
    },
    getContactFirst: (state, getters) => id => {
      return getters.getContactById(id).firstName
    },
    getContactLast: (state, getters) => id => {
      return getters.getContactById(id).lastName
    },
    getContactProfilePic: (state, getters) => id => {
      return getters.getContactById(id).profilePic
    }
  },
  mutations: {
    changeUserName: (state, payload) => id => {
      state.contacts[id].userName = payload
    },
    changePassword: (state, payload) => id => {
      state.contacts[id].password = payload
    }
  },
  actions: {
    changeUserName: ({ commit }, id, payload) => {
      commit('changeUserName', id, payload)
    },
    changePassword: ({ commit }, id, payload) => {
      commit('changePassword', id, payload)
    }
  }
  // modules: {
  //   contacts,
  //   group
  // }
})
