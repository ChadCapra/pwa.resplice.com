export default {
  state: {
    groups: []
  },
  getters: {
    getGroupContacts: state => memberIds => state.contacts.filter(contact => memberIds.includes(contact.id)),
    getGroupById: state => id => state.groups.find(group => group.id === id),
    getGroups: state => state.groups
  },
  mutations: {},
  actions: {}
}
