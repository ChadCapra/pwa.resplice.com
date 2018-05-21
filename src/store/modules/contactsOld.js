// Initial State
const state = {
  contacts: [
    {
      id: '5'
    }
  ]
}

// getters
const getters = {
  contacts: (state) => (id) => {
    return state.added.map(({ id }) => {
      const contact = state.contacts.all.find(contact => contact.id === id)
      return {
        firstName: contact.firstName,
        lastName: contact.lastName,
        group: contact.group,
        profilePic: contact.profilePic,
        attributes: contact.attributes
      }
    })
  }
}

// Actions
const actions = {
}

// Mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
