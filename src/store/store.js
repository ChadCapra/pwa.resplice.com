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
const baseUrl = 'http://10.1.10.241:8081/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: true,
    userLoading: true,
    contactsLoading: true,
    groupsLoading: true,
    searchState: '',
    user: {},
    contacts: null,
    contactCount: 0,
    groups: null,
    pending: {
      outgoing: [],
      incoming: []
    },
    attributeTypes: [
      {
        id: '1',
        name: 'Phone',
        icon: 'phone',
        isUnique: true,
        attributes: []
      },
      {
        id: '2',
        name: 'Email',
        icon: 'envelope',
        isUnique: true,
        attributes: []
      },
      {
        id: '3',
        name: 'Address',
        icon: 'home',
        isUnique: true,
        attributes: []
      },
      {
        id: '4',
        name: 'Social',
        icon: 'at',
        isUnique: true,
        attributes: []
      },
      {
        id: '5',
        name: 'Website',
        icon: 'globe',
        isUnique: true,
        attributes: []
      },
      {
        id: '6',
        name: 'Other',
        icon: 'paper-plane',
        isUnique: true,
        attributes: []
      }
    ],
    settings: {
      nameFormat: 'First Last',
      showRecentlyContacted: true
    },
    navIndex: {
      one: true,
      two: false,
      three: false,
      four: false,
      five: false
    },
    header: {
      showHeader: true,
      showSearch: true,
      showBack: false,
      text: 'Resplice'
    },
    sharing: {
      contacts: [],
      attributes: []
    },
    map: {
      locations: []
    }
  },
  getters: {
    getContactById: state => id => {
      return state.contacts.find(contact => contact.id === id)
    },
    getAttributes: (state, getters) => id => {
      return getters.getContactById(id).attributes
    },
    getFilteredAttributes: state => typeId => {
      var attributes = state.user.user_attributes
      return attributes.filter(attr => attr.type_id === typeId)
    },
    getContactId: (state, getters) => id => {
      return getters.getContactById(id).id
    },
    getContactFirst: (state, getters) => id => {
      return getters.getContactById(id).first_name
    },
    getContactLast: (state, getters) => id => {
      return getters.getContactById(id).last_name
    },
    getContactProfilePic: (state, getters) => id => {
      return getters.getContactById(id).profile_pic
    },
    getContacts: state => {
      return state.contacts
    },
    getNavIndex: state => {
      return state.navIndex
    },
    getFilteredContacts: state => text => {
      return state.contacts.filter(contact => (contact.searchableAttributes.includes(text)))
    },
    getGroupContacts: state => memberIds => {
      return state.contacts.filter(contact => memberIds.includes(contact.id))
    },
    getContactCount: state => {
      return state.contactCount
    },
    getUserInfo: state => {
      return state.user
    },
    getUserAttributes: state => {
      return state.user.user_attributes
    },
    getAttributeTypes: state => {
      return state.attributeTypes
    },
    getGroupById: state => id => {
      return state.groups.find(group => group.id === id)
    },
    getGroups: state => {
      return state.groups
    },
    getSearchInput: state => {
      return state.searchState
    },
    getUserLoading: state => {
      return state.userLoading
    },
    getContactsLoading: state => {
      return state.contactsLoading
    },
    getGroupsLoading: state => {
      return state.groupsLoading
    },
    getSharingContacts: state => {
      return state.sharing.contacts
    },
    getSharingAttributes: state => {
      return state.sharing.attributes
    },
    getShowHeader: state => {
      return state.header.showHeader
    }
  },
  mutations: {
    setCurrentUser: (state, payload) => {
      state.user = payload
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
    setTypeNotUnique: (state, payload) => {
      state.attributeTypes.find(type => type.id === payload).isUnique = false
    },
    changeUserName: (state, payload) => id => {
      state.contacts[id].username = payload
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
      state.user.user_basic.dob = payload
    },
    updateFirstName: (state, payload) => {
      state.user.user_basic.first_name = payload
    },
    updateLastName: (state, payload) => {
      state.user.user_basic.last_name = payload
    },
    updateGender: (state, payload) => {
      state.user.user_basic.gender = payload
    },
    updateLanguage: (state, payload) => {
      state.user.lang = payload
    },
    updateProfilePic: (state, payload) => {
      state.user.user_basic.profile_pic = payload
    },
    changeNameFormat: (state, payload) => {
      state.settings.nameFormat = payload
    },
    toggleShowRecentlyContacted: (state, payload) => {
      state.settings.showRecentlyContact = payload
    },
    buildSearchableAttributes: state => {
      var contacts = state.contacts
      for (var i = 0; i < contacts.length; ++i) {
        contacts[i].searchableAttributes = `${contacts[i].first_name}${contacts[i].last_name}`.toLowerCase()
      }
    },
    sanitizeAttributes: state => {
      var mod = state.user.user_attributes
      for (var i = mod.length - 1; i >= 0; i--) {
        if (mod[i].value === '') {
          mod.splice(i, 1)
        }
      }
      state.user.user_attributes = mod
    },
    addAttribute: (state, payload) => {
      payload.id = state.user.user_attributes.length + 1
      state.user.user_attributes.push(payload)
    },
    removeAttribute: (state, payload) => {
      var attributes = state.user.user_attributes
      var attr = state.user.user_attributes.find(attribute => attribute.id === payload)
      var i = attributes.indexOf(attr)
      state.user.user_attributes.splice(i, 1)
    },
    loadingDoneUser: state => {
      state.userLoading = false
    },
    loadingDoneContacts: state => {
      state.contactsLoading = false
    },
    loadingDoneGroups: state => {
      state.groupsLoading = false
    },
    buildContactCount: state => {
      state.contactCount = state.contacts.length
    },
    setSharingContacts: (state, payload) => {
      state.sharing.contacts = payload
    },
    setSharingAttributes: (state, payload) => {
      state.sharing.attributes = payload
    },
    clearSharing: state => {
      state.sharing.attributes = []
      state.sharing.contacts = []
    },
    removeHeader: state => {
      state.header.showHeader = false
    },
    addHeader: state => {
      state.header.showHeader = true
    },
    showSearch: state => {
      state.header.showSearch = true
    },
    removeSearch: state => {
      state.header.showSearch = false
    },
    setMapLocations: (state, payload) => {
      state.map.locations = payload
    }
  },
  actions: {
    login: ({commit}, id, payload) => {
      axios.get(`${baseUrl}/user`, config)
        .then(response => {
          commit('setCurrentUser', response.data)
          commit('loadingDoneUser')
        })
        .catch(e => {
          console.log(e)
        })
      axios.get(`${baseUrl}/contacts`, config)
        .then(response => {
          commit('setContacts', response.data)
          commit('buildSearchableAttributes')
          commit('buildContactCount')
          commit('loadingDoneContacts')
        })
        .catch(e => {
          console.log(e)
        })
      axios.get(`${baseUrl}/groups`, config)
        .then(response => {
          commit('setGroups', response.data)
          commit('loadingDoneGroups')
        })
        .catch(e => {
          console.log(e)
        })
      commit('setLogin', true)
    },
    logout: ({commit}) => {
      commit('setCurrentUser', {})
      commit('setContacts', null)
      commit('setLogin', false)
      commit('setGroups', null)
    },
    changeUserName: ({ commit }, id, payload) => {
      commit('changeUserName', id, payload)
    },
    changePassword: ({ commit }, id, payload) => {
      commit('changePassword', id, payload)
    },
    pushAttribute: ({ commit }, payload) => {
      commit('addAttribute', payload)
    },
    setSharingContacts: ({ commit }, payload) => {
      commit('setSharingContacts', payload)
    },
    setSharingAttributes: ({ commit }, payload) => {
      commit('setSharingAttributes', payload)
    },
    share: ({ commit }, payload) => {
      // Call API

      // Cleanup
      commit('setSharingContacts', [])
      commit('setSharingAttributes', [])
    },
    buildMap: ({ commit }, payload) => {
      // Sends a list of ids to server to get back lat and lng locations array
      axios.post(`${baseUrl}/map`, payload, config)
        .then(response => {
          commit('setMapLocations', response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  // modules: {
  //   contacts,
  //   group
  // }
})
