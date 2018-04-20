import Vue from 'vue'
import Vuex from 'vuex'
import contact from './modules/contact'
import group from './modules/group'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    contact,
    group
  }
})
