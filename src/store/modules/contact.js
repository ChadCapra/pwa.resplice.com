const state = {
  user: {
    id: '100',
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    is_admin: false,
    attribute: {
      1: {
        id: '1',
        contact_id: 100,
        attribute_group_id: 10,
        type: 'mobile',
        value: '999-999-9999',
        verified: true,
        primary_of_type: false
      },
      2: {
        id: '2',
        contact_id: 100,
        attribute_group_id: 10,
        type: 'address',
        value: '1176 14th Ave SE Minneapolis, MN 55414',
        verified: true,
        primary_of_type: false
      },
      3: {
        id: '3',
        contact_id: 100,
        attribute_group_id: 10,
        type: 'phone',
        value: '555-555-5555',
        verified: true,
        primary_of_type: true
      },
      4: {
        id: '4',
        contact_id: 100,
        attribute_group_id: 10,
        type: 'email',
        value: 'name@domain.com',
        verified: false,
        primary_of_type: false
      }
    }
  }
}

const getters = {
  attribute: state => {
    return state.attribute
  },
  userId: state => {
    return state.user.id
  },
  userFirst: state => {
    return state.user.firstName
  },
  userLast: state => {
    return state.user.lastName
  },
  userUserName: state => {
    return state.user.userName
  },
  userPassword: state => {
    return state.user.password
  }
}

const mutations = {
  changeUserName: (state, payload) => {
    state.user.userName = payload
  },
  changePassword: (state, payload) => {
    state.user.password = payload
  }
}

const actions = {
  changeUserName: ({ commit }, payload) => {
    commit('changeUserName', payload)
  },
  changePassword: ({ commit }, payload) => {
    commit('changePassword', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
