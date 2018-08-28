import api from '@/utils/api'
import jwtDecode from 'jwt-decode'

export default {
  state: {
    signInData: {
      email: '',
      phone: '',
      password: ''
    },
    user_object: {
      id: '',
      cid: '',
      name: '',
      date_of_birth: '',
      gender: '',
      profile_pic: '',
      thumbnail: '',
      contact_attributes: [
        {
          id: 1,
          attribute_type_id: 1,
          value: '218-591-0657',
          sub_type: 'Personal',
          verified_at: '',
          primary_of_type: true
        }
      ],
      tags: [
        {
          id: 1,
          value: 'Friends'
        },
        {
          id: 2,
          value: 'Coworkers'
        },
        {
          id: 3,
          value: 'Roommates'
        }
      ]
    },
    jwt: {},
    loggedIn: false,
    userLoading: true
  },
  getters: {
    getUserId: state => state.user_object.id,
    getUserAttributes: state => state.user_object.contact_attributes,
    getUserTags: state => state.user_object.tags,
    getUser: state => state.user_object,
    getProfilePic: state => state.user_object.profile_pic,
    getThumbnail: state => state.user_object.thumbnail,
    getSignInData: state => state.signInData,
    getLoggedIn: state => state.loggedIn,
    getFilteredAttributes: state => typeId => state.user_object.contact_attributes.filter(attr => attr.attribute_type_id === typeId),
    getJWT: state => state.jwt
  },
  mutations: {
    setSignInEmail: (state, payload) => {
      state.signInData.email = payload
    },
    setSignInPhone: (state, payload) => {
      state.signInData.phone = payload
    },
    setSignInPassword: (state, payload) => {
      state.signInData.password = payload
    },
    setUser: (state, payload) => {
      state.user_object = payload
    },
    setLogin: (state, payload) => {
      state.loggedIn = payload
    },
    setUserLoadingDone: (state, payload) => {
      state.userLoading = payload
    },
    updatePassword: (state, payload) => {
      state.user_object.password = payload
    },
    updateProfilePic: (state, payload) => { // Used for testing
      state.user_object.profile_pic = payload
    },
    updateName: (state, payload) => {
      state.user_object.name = payload
    },
    updateDOB: (state, payload) => {
      state.user_object.date_of_birth = payload
    },
    updateGender: (state, payload) => {
      state.user_object.gender = payload
    },
    updateThumbnail: (state, payload) => { // Used for testing
      state.user_object.thumbnail = payload
    },
    sanitizeAttributes: state => {
      var mod = state.user.contact_attributes
      for (var i = mod.length - 1; i >= 0; i--) {
        if (mod[i].value === '') {
          mod.splice(i, 1)
        }
      }
      state.user.contact_attributes = mod
    },
    parseJWT: (state, payload) => {
      state.jwt = jwtDecode(payload.slice(9))
      api.defaults.headers.common['Authorization'] = payload
      api.defaults.headers['Authorization'] = payload
      window.localStorage.setItem('token', payload)
      window.localStorage.setItem('id', state.jwt.sub)
    }
  },
  actions: {
    signIn: ({commit, state}, signInData) => new Promise((resolve, reject) => {
      api.post('/sign_in', signInData)
        .then(response => {
          commit('parseJWT', response.data.return_object.user_object.token)
          commit('setLogin', true)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    }),
    tokenLogin: ({commit, state}, localStorage) => new Promise((resolve, reject) => {
      commit('parseJWT', localStorage.getItem('token'))
      api.get('/contact')
        .then(response => {
          commit('setUser', response.data.return_object.user_object)
          resolve(response.data.return_object.contacts_list)
        })
        .catch(error => {
          reject(error)
        })
    }),
    signUp: ({commit}, signUp) => new Promise((resolve, reject) => {
      api.post('/sign_up', signUp)
        .then(response => {
          commit('parseJWT', response.data.return_object.user_object.token)
          commit('setUser', response.data.return_object.user_object)
          resolve(response.data.return_object.contacts_list)
        })
        .catch(error => {
          reject(error)
        })
    }),
    refresh: ({commit, state}) => new Promise((resolve, reject) => {
      api.get('/contact')
        .then(response => {
          commit('setUser', response.data.return_object.user_object)
          resolve(response.data.return_object.contacts_list)
        })
        .catch(error => {
          reject(error)
        })
    }),
    matchAttributes: ({commit, state}, signInData) => new Promise((resolve, reject) => {
      api.post('/login_attempt', signInData)
        .then(response => {
          resolve(response.data.matches)
        })
        .catch(error => {
          reject(error)
        })
    }),
    createUserAttribute: ({commit, state}, attribute) => new Promise((resolve, reject) => {
      api.post('/attribute', attribute)
        .then(response => {
          commit('setUser', response.data.return_object.user_object)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    }),
    updateUserAttribute: ({commit, state}, updatedAttribute) => new Promise((resolve, reject) => {
      api.put('/attribute', updatedAttribute)
        .then(response => {
          commit('setUser', response.data.return_object.user_object)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    }),
    deleteUserAttribute: ({commit}, attribute) => new Promise((resolve, reject) => {
      api.delete('/attribute', attribute)
        .then(response => {
          commit('setUser', response.data.return_object.user_object)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    }),
    updateUserValue: ({commit, state}, contact) => {
      var contactUpdates = { contact }
      return new Promise((resolve, reject) => {
        api.put('/contact', contactUpdates)
          .then(response => {
            commit('setUser', response.data.return_object.user_object)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    verify: ({commit}, codes) => new Promise((resolve, reject) => {
      api.post('/verify', codes)
        .then(response => {
          commit('setUser', response.data.return_object.user_object)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
