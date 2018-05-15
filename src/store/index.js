import Vue from 'vue'
import Vuex from 'vuex'
import contact from './modules/contact'
import group from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    contact,
    group
  }
})
