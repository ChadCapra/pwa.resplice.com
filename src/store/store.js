import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/utils/api'

// Import Modules
import contacts from './modules/contacts'
import services from './modules/services'
import share from './modules/share'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    logout: ({commit}) => {
      commit('setUser', {
        id: '',
        cid: '',
        name: '',
        profile_pic: '',
        thumbnail: '',
        contact_attributes: []
      })
      commit('setContacts', [])
      commit('setLogin', false)
      api.defaults.headers.common['Authorization'] = null
    }
  },
  modules: {
    user,
    share,
    services,
    contacts
  }
})
