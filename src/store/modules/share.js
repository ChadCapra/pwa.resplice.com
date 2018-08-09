import api from '@/utils/api'

export default {
  state: {
    sharing: {
      contacts: [],
      attributes: []
    },
    queue: {
      incoming: [
        {
          id: 2,
          // Can be general, attribute, update, or group
          share_type: 'attribute',
          contact_id: 2,
          contact_name: 'Darth Revan',
          attribute_type_id: 2,
          timestamp: '10 Seconds Ago' // need to change to server timestamp and calculate in getter
        },
        {
          id: 1,
          // Can be general, attribute, update, or group
          share_type: 'general',
          contact_id: 1,
          contact_name: 'Bastilla Shan',
          attribute_type_id: undefined,
          timestamp: '2 Hours Ago' // need to change to server timestamp and calculate in getter
        },
        {
          id: 3,
          // Can be general, attribute, update, or group
          share_type: 'update',
          contact_id: 4,
          contact_name: 'Obi-wan Kenobi',
          attribute_type_id: 2,
          timestamp: '10 Minutes Ago' // need to change to server timestamp and calculate in getter
        },
        {
          id: 4,
          // Can be general, attribute, update, or group
          share_type: 'group',
          group_id: 1,
          contact_name: 'Jedi Knights',
          attribute_type_id: undefined,
          timestamp: '5 Days Ago' // need to change to server timestamp and calculate in getter
        }
      ],
      outgoing: [
        {
          id: 1,
          share_type: 'ping',
          contact_id: 7,
          contact_name: 'Han Solo',
          timestamp: '10 Minutes Ago'
        },
        {
          id: 2,
          share_type: 'ping',
          contact_id: 5,
          contact_name: 'Darth Vader',
          timestamp: '1 Day Ago'
        },
        {
          id: 3,
          share_type: 'ping',
          contact_id: 6,
          contact_name: 'Obi-wan Kenobi',
          timestamp: '22 Hours Ago'
        }
      ]
    },
    // 0 (default) - share with attribute
    // 1 - share with user id
    // 2 - share with qr code link
    sharingType: 0
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
    },
    getSharingContactIds: state => {
      var contactIds = []
      state.sharing.contacts.forEach(contact => {
        contactIds.push(contact.id)
      })
      return contactIds
    },
    getSharingType: state => state.sharingType,
    getQueue: state => state.queue
  },
  mutations: {
    setSharingContacts: (state, payload) => {
      state.sharing.contacts = payload
    },
    setSharingAttributes: (state, payload) => {
      state.sharing.attributes = payload
    },
    setSharingType: (state, payload) => {
      state.sharingType = payload
    },
    clearSharing: state => {
      state.sharing.attributes = []
      state.sharing.contacts = []
      state.sharingType = 0
    },
    setOutgoing: (state, payload) => {
      state.queue.outgoing = payload
    },
    setIncoming: (state, payload) => {
      state.queue.incoming = payload
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
        .catch(error => { reject(error) })
    }),
    shareWithId: ({commit}, shareIds) => new Promise((resolve, reject) => {
      api.post('/share/contacts', shareIds)
        .then(response => {
          resolve(response.data.return_object.contacts_list)
          console.log(response.data)
          // Cleanup
          commit('clearSharing')
        })
        .catch(error => { reject(error) })
    }),
    ping: ({commit}, id) => new Promise((resolve, reject) => {
      api.put('/request', id)
        .then(response => {
          commit('setOutgoing', response.data.return_object.outgoing)
          resolve()
        })
        .catch(error => { reject(error) })
    }),
    requestAttrib: ({commit}, request) => new Promise((resolve, reject) => {
      api.post('/request', request)
        .then(response => {
          commit('setOutgoing', response.data.return_object.outgoing)
          resolve()
        })
        .catch(error => { reject(error) })
    }),
    requestAttribUpdate: ({commit}, request) => new Promise((resolve, reject) => {
      api.post('/request/update', request)
        .then(response => {
          commit('setOutgoing', response.data.return_object.outgoing)
          resolve()
        })
        .catch(error => { reject(error) })
    })
  }
}
