import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/signin/Signin'
import Container from '@/contacts/Container'
import Profile from '@/contacts/Profile'
import Notif from '@/notif/Notif'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      component: Container
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profile/:id', // I want this to eventually go to a profile with a unique ID
      name: 'Profile',
      component: Profile
    },
    {
      path: '/notif', // Notifications page
      name: 'Notif',
      component: Notif
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
