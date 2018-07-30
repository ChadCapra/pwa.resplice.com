import api from '@/utils/api'

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
      profile_pic: '',
      thumbnail: '',
      contact_attributes: []
    },
    loggedIn: false,
    userLoading: true
  },
  getters: {
    getUserId: state => state.user_object.id,
    getUserAttributes: state => state.user_object.contact_attributes,
    getUser: state => state.user_object,
    getPassword: state => state.user_object.password,
    getProfilePic: state => state.user_object.profile_pic,
    getThumbnail: state => state.user_object.thumbnail,
    getSignInData: state => state.signInData,
    getLoggedIn: state => state.loggedIn
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
    setPassword: (state, payload) => {
      state.user_object.password = payload
    },
    setLogin: (state, payload) => {
      state.loggedIn = payload
    },
    setUserLoadingDone: (state, payload) => {
      state.userLoading = payload
    }
  },
  actions: {
    signIn: ({commit, state}, signInData) => {
      return new Promise((resolve, reject) => {
        api.post('/sign_in', signInData)
          .then(response => {
            var errorCode = 100
            console.log(response)
            if (response.status === 200) {
              api.defaults.headers.common['Authorization'] = response.data.return_object.user_object.token
              api.defaults.headers['Authorization'] = response.data.return_object.user_object.token
              commit('setUser', response.data.return_object.user_object)
              commit('setUserLoading', false)
              commit('setLogin', true)
              resolve()
            } else {
              reject(errorCode)
            }
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    signUp: ({commit}, signUp) => {
      return new Promise((resolve, reject) => {
        api.post('/sign_up', signUp)
          .then(response => {
            console.log(response.data)
            console.log(api.defaults.headers)
            api.defaults.headers.common['Authorization'] = response.data.return_object.user_object.token
            api.defaults.headers['Authorization'] = response.data.return_object.user_object.token
            commit('setUser', response.data.return_object.user_object)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    matchAttributes: ({commit, state}, signInData) => {
      return new Promise((resolve, reject) => {
        api.post('/login_attempt', signInData)
          .then(response => {
            resolve(response.data.matches)
          })
          .catch(error => {
            console.log(error)
            console.log('Cannot connect to server')
            reject(error)
          })
      })
    },
    updateUserValue: ({commit, state}, updatedValue) => {
      return new Promise((resolve, reject) => {
        api.put('/contacts', updatedValue)
          .then(response => {
            commit('setUser', response.data.return_object.user_object)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    sendVerify: (attrib) => {
      // Call API to verify attribute
    },
    verify: ({commit}, codes) => {
      return new Promise((resolve, reject) => {
        api.post('/verify', codes)
          .then(response => {
            commit('setUser', response.data.return_object.user_object)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  }
}
