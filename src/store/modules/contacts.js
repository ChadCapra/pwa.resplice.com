// Initial State
const state = {
  contacts: []
}

// getters
const getters = {
  contacts: (state, getters, rootState) => {
    return state.added.map(({ id }) => {
      const contact = rootState.contacts.all.find(contact => contact.id === id)
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
