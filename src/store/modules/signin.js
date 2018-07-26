import api from '@/utils/api'

export default {
  state: {
    email: '',
    phone: '',
    password: '',
    matchNumber: null,
    user: {
      id: '',
      cid: '',
      name: '',
      password: '',
      confirmPassword: '',
      contact_attributes: []
    }
  },
  getters: {
    getEmail: state => {
      return state.email
    },
    getPhone: state => {
      return state.phone
    },
    getUser: state => {
      return state.user
    },
    getPassword: state => {
      return state.password
    },
    getMatchNumber: state => {
      return state.matchNumber
    }
  },
  mutations: {
    setEmail: (state, payload) => {
      state.email = payload
    },
    setPhone: (state, payload) => {
      state.phone = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    setPassword: (state, payload) => {
      state.password = payload
    },
    setMatchNumber: (state, payload) => {
      state.matchNumber = payload
    }
  },
  actions: {
    signIn: ({commit, state}) => {
      return new Promise((resolve, reject) => {
        api.post('sign_in', {
          email: state.email,
          phone: state.phone,
          password: state.password
        })
          .then(response => {
            // Do password incorrect error checking here and reject if password is incorrect
            var errorCode = 100
            if (response.statusCode === 200) {
              api.defaults.headers.common['Authorization'] = response.token
              resolve(response.data.response_object) // resolve with response.data
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
    signUp: ({commit}) => {
      console.log('Signing up...')
    },
    matchAttributes: ({commit, state}) => {
      // Call API to match attributes in database
      return new Promise((resolve, reject) => {
        api.post('/login_attempt', {
          email: state.email,
          phone: state.phone
        })
          .then(response => {
            commit('setMatchNumber', response.data.matches)
            resolve()
          })
          .catch(error => {
            console.log(error)
            console.log('Cannot connect to server')
            reject(error)
          })
      })
    },
    sendVerify: (attrib) => {
      // Call API to verify attribute
    },
    verify: (code) => {
      // Call API to verify code
    }
  }
}
