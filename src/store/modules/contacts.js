import api from '@/utils/api'

export default {
  state: {},
  getters: {
    getContactById: state => id => state.contacts.find(contact => contact.id === id),
    getContactAttributes: (state, getters) => id => getters.getContactById(id).attributes
  },
  mutations: {},
  actions: {}
}
