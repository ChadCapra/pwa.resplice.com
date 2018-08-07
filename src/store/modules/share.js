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
    share: ({ commit }, shareRequest) => {
      return new Promise((resolve, reject) => {
        api.post('/share', shareRequest)
          .then(response => {
            resolve(response.data.return_object.contacts_list)
            console.log(response.data)
            // Cleanup
            commit('setSharingContacts', [])
            commit('setSharingAttributes', [])
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
