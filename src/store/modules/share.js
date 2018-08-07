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
    getSharingAttributes: state => state.sharing.attributes,
    getSharingAttributeIds: state => {
      var attributeIds = []
      state.sharing.attributes.forEach(attr => {
        attributeIds.push(attr.id)
      })
      return attributeIds
    }
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
    shareWithAttribute: ({ commit }, shareRequest) => new Promise((resolve, reject) => {
      api.post('/share', shareRequest)
        .then(response => {
          resolve(response.data.return_object.contacts_list)
          console.log(response.data)
          // Cleanup
          commit('clearSharing')
        })
        .catch(error => {
          reject(error)
        })
    }),
    shareWithId: ({commit}, shareIds) => new Promise((resolve, reject) => {
      api.post('/share/contacts', shareIds)
        .then(response => {
          resolve(response.data.return_object.contacts_list)
          console.log(response.data)
          // Cleanup
          commit('clearSharing')
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
