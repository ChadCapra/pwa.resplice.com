export default {
  state: {
    contact_list: [],
    attributeTypes: [
      {
        id: 1,
        name: 'Phone',
        icon: 'phone',
        isUnique: true
      },
      {
        id: 2,
        name: 'Email',
        icon: 'envelope',
        isUnique: true
      },
      {
        id: 3,
        name: 'Address',
        icon: 'home',
        isUnique: true
      },
      {
        id: 4,
        name: 'Social',
        icon: 'at',
        isUnique: true
      },
      {
        id: 5,
        name: 'Website',
        icon: 'globe',
        isUnique: true
      },
      {
        id: 6,
        name: 'Other',
        icon: 'paper-plane',
        isUnique: true
      }
    ]
  },
  getters: {
    getAllContacts: state => state.contact_list,
    getContactCount: state => state.contact_list.length,
    getContactById: state => id => state.contact_list.find(contact => contact.id === id),
    getContactAttributes: (state, getters) => id => getters.getContactById(id).attributes,
    getContactAttributesFiltered: (state, getters) => (id, ati) => {
      const attributes = getters.getContactById(id).attributes.filter(attr => attr.attribute_type_id === ati)
      if (attributes.length > 0) {
        return attributes
      } else {
        return [{id: 0}]
      }
    },
    getContactFirstName: (state, getters) => id => getters.getContactById(id).name.split(' ', 1).join(' '),
    getContactLastName: (state, getters) => id => getters.getContactById(id).name.split(' ').slice(1).join(' '),
    getContactLetter: (state, getters) => id => getters.getContactById(id).name.charAt(0),
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
      var contacts = state.contact_list
      for (var i = 0; i < contacts.length; ++i) {
        contacts[i].searchableAttributes = `${contacts[i].name}`.toLowerCase()
      }
    },
    setTypeNotUnique: (state, payload) => {
      state.attributeTypes.find(type => type.id === payload).isUnique = false
    }
  },
  actions: {}
}
