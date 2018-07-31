import api from '@/utils/api'

export default {
  state: {
    sharing: {
      contacts: [],
      attributes: []
    },
    pending: {
      incoming: [],
      outgoing: []
    }
  },
  getters: {
    getSharingContacts: state => state.sharing.contacts,
    getSharingAttributes: state => state.sharing.attributes
  },
  mutations: {
    setSharingContacts: (state, payload) => {
      state.sharing.contacts = payload
    },
    setSharingAttributes: (state, payload) => {
      state.sharing.attributes = payload
    },
    clearSharing: state => {
      state.sharing.attributes = []
      state.sharing.contacts = []
    }
  },
  actions: {
    share: ({ commit }, payload) => {
      api.post('/share', payload)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      // Cleanup
      commit('setSharingContacts', [])
      commit('setSharingAttributes', [])
    }
  }
}
