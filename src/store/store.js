import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Config for axios
const config = {
  async: true
  // onUploadProgress: progressEvent => {
  //   console.log(`Loading: ${progressEvent}`)
  // }
}
const baseUrl = 'https://resplice.mocklab.io/api'
// const baseUrl = 'http://localhost:4000/api'
axios.defaults.headers.common['Authorization'] = null

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: true,
    userLoading: true,
    contactsLoading: true,
    groupsLoading: true,
    mapLoading: true,
    searchState: '',
    user: {
      username: '',
      password: '',
      password_confirmation: 'Password123',
      contact: {
        name: ''
      },
      contact_attributes: []
    },
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
      headerText: '',
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
      var attributes = state.user.contact_attributes
      return attributes.filter(attr => attr.attribute_type_id === typeId)
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
      return state.user.contact_attributes
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
    getMapLoading: state => {
      return state.mapLoading
    },
    getSharingContacts: state => {
      return state.sharing.contacts
    },
    getSharingAttributes: state => {
      return state.sharing.attributes
    },
    getShowHeader: state => {
      return state.header.showHeader
    },
    getSettingsHeaderText: state => {
      return state.settings.headerText
    },
    getMapLocations: state => {
      return state.map.locations
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
    changeUserName: (state, payload) => {
      state.user.username = payload
    },
    changePassword: (state, payload) => {
      state.user.password = payload
    },
    changeNavIndex: (state, payload) => {
      state.navIndex.one = state.navIndex.two = state.navIndex.three = state.navIndex.four = state.navIndex.five = false
      state.navIndex[payload] = true
    },
    updateSearch: (state, payload) => {
      state.searchState = payload
    },
    updateDOB: (state, payload) => {
      state.user.contact.dob = payload
    },
    updateName: (state, payload) => {
      state.user.contact.name = payload
    },
    updateGender: (state, payload) => {
      state.user.contact.gender = payload
    },
    updateLanguage: (state, payload) => {
      state.user.lang = payload
    },
    updateProfilePic: (state, payload) => {
      state.user.contact.profile_pic = payload
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
      var mod = state.user.contact_attributes
      for (var i = mod.length - 1; i >= 0; i--) {
        if (mod[i].value === '') {
          mod.splice(i, 1)
        }
      }
      state.user.contact_attributes = mod
    },
    addAttribute: (state, payload) => {
      payload.id = state.user.contact_attributes.length + 1
      state.user.contact_attributes.push(payload)
    },
    removeAttribute: (state, payload) => {
      var attributes = state.user.contact_attributes
      var attr = state.user.contact_attributes.find(attribute => attribute.id === payload)
      var i = attributes.indexOf(attr)
      state.user.contact_attributes.splice(i, 1)
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
    loadingDoneMap: state => {
      state.mapLoading = false
    },
    resetLoading: state => {
      state.userLoading = true
      state.contactsLoading = true
      state.groupsLoading = true
      state.mapLoading = true
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
    },
    setSettingsHeaderText: (state, payload) => {
      state.settings.headerText = payload
    }
  },
  actions: {
    login: ({commit, dispatch}, payload) => {
      axios.post(`${baseUrl}/sign_in`, payload, config)
        .then(response => {
          console.log(response)
          dispatch('setUser', response.data)
          dispatch('setAllContacts')
          dispatch('setAllGroups')
          commit('setLogin', true)
        })
        .catch(e => {
          console.log(e)
        })
    },
    setUser: ({commit}, payload) => {
      axios.defaults.headers.common['Authorization'] = payload.token
      commit('setCurrentUser', payload)
      commit('loadingDoneUser')
    },
    setAllContacts: ({commit}) => {
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
    },
    setAllGroups: ({commit}) => {
      axios.get(`${baseUrl}/groups`, config)
        .then(response => {
          commit('setGroups', response.data)
          commit('loadingDoneGroups')
        })
        .catch(e => {
          console.log(e)
        })
    },
    logout: ({commit}) => {
      commit('setCurrentUser', {username: '', password: '', password_confirmation: 'Password123', contact: {name: ''}, contact_attributes: []})
      commit('setContacts', null)
      commit('setLogin', false)
      commit('setGroups', null)
      commit('resetLoading')
      axios.defaults.headers.common['Authorization'] = null
    },
    signUp: ({commit, dispatch}, payload) => {
      axios.post(`${baseUrl}/sign_up`, payload, config)
        .then(response => {
          dispatch('setUser', response.data)
          dispatch('setAllContacts')
          // dispatch('setAllGroups', response.data.id)
          commit('setLogin', true)
        })
        .catch(e => {
          console.log(e)
        })
    },
    submitAttributes: ({dispatch}, payload) => {
      axios.post(`${baseUrl}/suggest_username`, payload)
        .then(response => {
          dispatch('changeUserName', response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    changeUserName: ({ commit }, payload) => {
      commit('changeUserName', payload)
    },
    changePassword: ({ commit }, payload) => {
      commit('changePassword', payload)
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
      axios.post(`${baseUrl}/share`, payload, config)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      // Cleanup
      commit('setSharingContacts', [])
      commit('setSharingAttributes', [])
    },
    buildMap: ({ commit }, payload) => {
      // Sends a list of ids to server to get back lat and lng locations array
      axios.post(`${baseUrl}/map`, payload, config)
        .then(response => {
          commit('setMapLocations', response.data)
          commit('loadingDoneMap')
        })
        .catch(error => {
          console.log(error)
        })
    },
    feedbackSubmit: ({ commit }, payload) => {
      axios.post(`${baseUrl}/feedback`, payload, config)
        .then(response => {
          console.log(payload)
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
  // modules: {
  //   contacts,
  //   group
  // }
})
