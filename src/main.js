// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// Import custom theme configured from element-variables.scss
import '../theme/index.css'
// Import Element CSS framework
import ElementUI from 'element-ui'
// Import needed FontAwesome logos and Icon component
import 'vue-awesome/icons/envelope'
import 'vue-awesome/icons/phone'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/map'
import 'vue-awesome/icons/mobile'
import 'vue-awesome/icons/globe'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/sign-out'
import 'vue-awesome/icons/comment'
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/users'
import 'vue-awesome/icons/user-circle'
import 'vue-awesome/icons/sort-down'
import 'vue-awesome/icons/ellipsis-h'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/arrow-left'
import 'vue-awesome/icons/bell'
import 'vue-awesome/icons/address-book'
import 'vue-awesome/icons/share'
import 'vue-awesome/icons/plus'
import Icon from 'vue-awesome/components/Icon'
// Import vue-touch for phone gestures
import VueTouch from 'vue-touch'
// Import Vue.js App component and router components
import App from './App'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false
Vue.use(VueTouch)
Vue.use(ElementUI)
Vue.component('icon', Icon)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
