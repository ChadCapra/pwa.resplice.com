import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/signin/Signin'
import Container from '@/contacts/Container'
import Profile from '@/contacts/Profile'
import Notif from '@/notif/Notif'
import Groups from '@/contacts/Groups'
import Maps from '@/contacts/Map'
import UserProfile from '@/contacts/UserProfile'
import Settings from '@/contacts/Settings'
import ContactList from '@/contacts/ContactList'
import Welcome from '@/signin/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Container,
      children: [
        {
          path: '',
          component: ContactList
        },
        {
          path: 'groups',
          component: Groups
        },
        {
          path: 'map',
          component: Maps
        },
        {
          path: 'userprofile',
          component: UserProfile
        },
        {
          path: 'settings',
          component: Settings
        }
      ]
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
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '*', redirect: '/' // Catch all other routes
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
