import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import contacts from './modules/contacts'
// import group from './modules/group'

// Config for axios
const config = {
  async: true,
  onUploadProgress: progressEvent => {
    console.log(`Loading: ${progressEvent}`)
  }
}
const baseUrl = 'http://localhost:8081/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: true,
    searchState: '',
    user: null,
    contacts: null,
    groups: null,
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
    settings: {
      nameFormat: 'First Last',
      showRecentlyContact: true
    },
    navIndex: {
      one: true,
      two: false,
      three: false,
      four: false,
      five: false
    },
    header: {
      showSearch: true,
      showBack: false,
      text: 'Resplice'
    }
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
    },
    getContacts: state => {
      return state.contacts
    },
    getNavIndex: state => {
      return state.navIndex
    },
    getFilteredContacts: (state, getters) => text => {
      return state.contacts.filter(contact => (contact.searchableAttributes.includes(text.toLowerCase())))
    },
    getGroupContacts: state => memberIds => {
      return state.contacts.filter(contact => memberIds.includes(contact.id))
    },
    getUserInfo: state => {
      return state.user
    },
    getUserAttributeGroups: state => {
      return state.user.attributeTypes
    },
    getGroupById: state => id => {
      return state.groups.find(group => group.id === id)
    },
    getGroups: state => {
      return state.groups
    },
    getSearchInput: state => {
      return state.searchState
    }
  },
  mutations: {
    setCurrentUser: (state, payload) => {
      state.user = payload
    },
    changeUserName: (state, payload) => id => {
      state.contacts[id].userName = payload
    },
    changePassword: (state, payload) => id => {
      state.contacts[id].password = payload
    },
    changeNavIndex: (state, payload) => {
      state.navIndex.one = state.navIndex.two = state.navIndex.three = state.navIndex.four = state.navIndex.five = false
      state.navIndex[payload] = true
    },
    updateSearch: (state, payload) => {
      state.searchState = payload
    },
    updateDOB: (state, payload) => {
      state.user.userBasic.DOB = payload
    },
    updateFirstName: (state, payload) => {
      state.user.userBasic.firstName = payload
    },
    updateLastName: (state, payload) => {
      state.user.userBasic.lastName = payload
    },
    updateGender: (state, payload) => {
      state.user.userBasic.gender = payload
    },
    updateLanguage: (state, payload) => {
      state.user.lang = payload
    },
    updateProfilePic: (state, payload) => {
      state.user.userBasic.profilePic = payload
    },
    changeNameFormat: (state, payload) => {
      state.settings.nameFormat = payload
    },
    toggleShowRecentlyContacted: (state, payload) => {
      state.settings.showRecentlyContact = payload
    },
    setContacts: (state, payload) => {
      state.contacts = payload
    },
    setGroups: (state, payload) => {
      state.groups = payload
    },
    setLogin: (state, payload) => {
      state.loggedIn = payload
    },
    buildSearchableAttributes: state => {
      var contacts = state.contacts
      for (var i = 0; i < contacts.length; ++i) {
        contacts[i].searchableAttributes = `${contacts[i].firstName}${contacts[i].lastName}`.toLowerCase()
      }
    }
  },
  actions: {
    login: ({commit}, id, payload) => {
      axios.get(`${baseUrl}/user`, config)
        .then(response => {
          commit('setCurrentUser', response.data)
        })
        .catch(e => {
          console.log(e)
        })
      axios.get(`${baseUrl}/contacts`, config)
        .then(response => {
          commit('setContacts', response.data)
          commit('buildSearchableAttributes')
        })
        .catch(e => {
          console.log(e)
        })
      axios.get(`${baseUrl}/groups`, config)
        .then(response => {
          commit('setGroups', response.data)
        })
        .catch(e => {
          console.log(e)
        })
      commit('setLogin', true)
    },
    logout: ({commit}, id, payload) => {
      commit('setCurrentUser', null)
      commit('setContacts', null)
      commit('setLogin', false)
      commit('setGroups', null)
    },
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
