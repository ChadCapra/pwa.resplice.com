const state = {
  contacts: [
    {
      id: '5',
      firstName: 'Luke',
      lastName: 'Skywalker',
      attributes: [
        {
          id: '1',
          contact_id: 5,
          attribute_group_id: 10,
          type: 'mobile',
          value: '999-999-9999',
          verified: true,
          primary_of_type: false
        },
        {
          id: '2',
          contact_id: 5,
          attribute_group_id: 10,
          type: 'address',
          value: '1176 14th Ave SE Minneapolis, MN 55414',
          verified: true,
          primary_of_type: false
        },
        {
          id: '3',
          contact_id: 5,
          attribute_group_id: 10,
          type: 'phone',
          value: '555-555-5555',
          verified: true,
          primary_of_type: true
        },
        {
          id: '4',
          contact_id: 5,
          attribute_group_id: 10,
          type: 'email',
          value: 'name@domain.com',
          verified: false,
          primary_of_type: false
        }
      ]
    },
    {
      id: '1',
      firstName: 'Bastilla',
      lastName: 'Shan',
      attributes: [
        {
          id: '1',
          contact_id: '1',
          attribute_group_id: '10',
          type: 'email',
          value: 'shan@darkside.com',
          verified: false,
          primary_of_type: true
        }
      ]
    }
  ]
}

const getters = {
  attributes: state => id => {
    return state.contacts[id].attributes
  },
  contactId: state => id => {
    return state.contacts[id].id
  },
  contactFirst: state => id => {
    return state.contacts[id].firstName
  },
  contactLast: state => id => {
    return state.contacts[id].lastName
  }
}

const mutations = {
  changeUserName: (state, payload) => id => {
    state.contacts[id].userName = payload
  },
  changePassword: (state, payload) => id => {
    state.contacts[id].password = payload
  }
}

// Actions - these should call api functions
const actions = {
  changeUserName: ({ commit }, id, payload) => {
    commit('changeUserName', id, payload)
  },
  changePassword: ({ commit }, id, payload) => {
    commit('changePassword', id, payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
