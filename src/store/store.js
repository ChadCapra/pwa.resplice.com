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
        attributes: [
          {
            id: '1',
            contact_id: 1,
            attribute_group_id: 10,
            type: 'mobile',
            value: '999-999-9999',
            verified: true,
            primary_of_type: false
          },
          {
            id: '2',
            contact_id: 1,
            attribute_group_id: 10,
            type: 'address',
            value: '1176 14th Ave SE Minneapolis, MN 55414',
            verified: true,
            primary_of_type: false
          },
          {
            id: '3',
            contact_id: 1,
            attribute_group_id: 10,
            type: 'phone',
            value: '555-555-5555',
            verified: true,
            primary_of_type: true
          },
          {
            id: '4',
            contact_id: 1,
            attribute_group_id: 10,
            type: 'email',
            value: 'name@domain.com',
            verified: false,
            primary_of_type: false
          }
        ]
      },
      {
        id: '5',
        firstName: 'Bastilla',
        lastName: 'Shan',
        attributes: [
          {
            id: '1',
            contact_id: '5',
            attribute_group_id: '10',
            type: 'email',
            value: 'shan@darkside.com',
            verified: false,
            primary_of_type: true
          }
        ]
      }
    ]
  },
  getters: {
    getContactById: state => id => {
      return state.contacts.find(contact => contact.id === id)
    },
    attributes: (state, getters) => id => {
      return getters.getContactById(id).attributes
    },
    contactId: (state, getters) => id => {
      return getters.getContactById(id).id
    },
    contactFirst: (state, getters) => id => {
      return getters.getContactById(id).firstName
    },
    contactLast: (state, getters) => id => {
      return getters.getContactById(id).lastName
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
