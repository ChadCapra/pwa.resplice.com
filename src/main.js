import Vue from 'vue'

// Import vue-awesome icons component for icons
import Icon from 'vue-awesome/components/Icon'

// Import vue-touch for phone gestures
import VueTouch from 'vue-touch'

// Import croppie for cropping photos
import VueCroppie from 'vue-croppie'

// Import vue qrcode reader for reading qr codes
import VueQrReader from 'vue-qrcode-reader'

// Import vue mask to mask input values
import VueMask from 'v-mask'

// Import moment library
import VueMoment from 'vue-moment'

import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import './plugins/element'
import './utils/fa-icons'

Vue.config.productionTip = false

Vue.use(VueQrReader, {name: 'qrcode-reader'})
Vue.use(VueCroppie)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueMask)
Vue.use(VueMoment)

Vue.component('icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
