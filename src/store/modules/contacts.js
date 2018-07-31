export default {
  state: {
    contact_list: [],
    attributeTypes: [
      {
        id: 1,
        name: 'Phone',
        icon: 'phone',
        isUnique: true,
        attributes: []
      },
      {
        id: 2,
        name: 'Email',
        icon: 'envelope',
        isUnique: true,
        attributes: []
      },
      {
        id: 3,
        name: 'Address',
        icon: 'home',
        isUnique: true,
        attributes: []
      },
      {
        id: 4,
        name: 'Social',
        icon: 'at',
        isUnique: true,
        attributes: []
      },
      {
        id: 5,
        name: 'Website',
        icon: 'globe',
        isUnique: true,
        attributes: []
      },
      {
        id: 6,
        name: 'Other',
        icon: 'paper-plane',
        isUnique: true,
        attributes: []
      }
    ]
  },
  getters: {
    getAllContacts: state => state.contact_list,
    getContactCount: state => state.contact_list.length,
    getContactById: state => id => state.contact_list.find(contact => contact.id === id),
    getContactAttributes: (state, getters) => id => getters.getContactById(id).attributes,
    getContactFirstName: (state, getters) => id => {},
    getContactLastName: (state, getters) => id => {},
    getContactProfilePicture: (state, getters) => id => getters.getContactById(id).profile_pic,
    getContactThumbnail: (state, getters) => id => getters.getContactById(id).thumbnail,
    getFilteredContacts: state => text => state.contact_list.filter(contact => (contact.searchableAttributes.includes(text))),
    getAttributeTypes: state => state.attributeTypes
  },
  mutations: {
    setContacts: (state, payload) => {
      state.contact_list = payload
    },
    buildSearchableAttributes: state => {
      var contacts = state.contacts
      for (var i = 0; i < contacts.length; ++i) {
        contacts[i].searchableAttributes = `${contacts[i].first_name}${contacts[i].last_name}`.toLowerCase()
      }
    },
    setTypeNotUnique: (state, payload) => {
      state.attributeTypes.find(type => type.id === payload).isUnique = false
    }
  },
  actions: {}
}
