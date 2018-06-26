// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Import custom theme configured from element-variables.scss
import '../theme/index.css'

// Import Element CSS framework
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

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
import 'vue-awesome/icons/address-card'
import 'vue-awesome/icons/share'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/calendar'
import 'vue-awesome/icons/lock'
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/at'
import 'vue-awesome/icons/paper-plane'
import 'vue-awesome/icons/facebook-square'
import 'vue-awesome/icons/twitter'
import 'vue-awesome/icons/google'
import 'vue-awesome/icons/link'
import 'vue-awesome/icons/check'
import Icon from 'vue-awesome/components/Icon'

// Import vue-touch for phone gestures
import VueTouch from 'vue-touch'

// Import croppie for cropping photos
import VueCroppie from 'vue-croppie'

// Import Vue.js App component, router component, and VueX for state management
import App from './App'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false
Vue.use(VueCroppie)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(ElementUI, {locale})
Vue.component('icon', Icon)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
