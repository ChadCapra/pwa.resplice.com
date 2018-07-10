import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/signin/Signin'
import SignUp from '@/signin/Signup'
import Container from '@/contacts/Container'
import Profile from '@/contacts/Profile'
import Notif from '@/share/Notif'
// import Groups from '@/contacts/Groups'
import Maps from '@/contacts/Map'
import UserProfile from '@/contacts/UserProfile'
import Settings from '@/contacts/Settings'
import ContactList from '@/contacts/ContactList'
import Welcome from '@/signin/Welcome'
// import GroupList from '@/contacts/GroupList'
import Share from '@/share/Share'
import Attributes from '@/share/Attributes'
import ComingSoon from '@/skeleton/ComingSoon'
import QRCamera from '@/share/QRCamera'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Container,
      children: [
        {
          name: 'root',
          path: '',
          component: ContactList
        },
        {
          path: '/groups',
          component: ComingSoon
        },
        {
          name: 'Share',
          path: '/share',
          component: Share
        },
        {
          path: '/map',
          component: Maps
        },
        {
          path: '/userprofile',
          component: UserProfile
        },
        {
          path: '/settings',
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
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/attributes',
      name: 'Attributes',
      component: Attributes
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
      path: '/qrcamera',
      name: 'QRCamera',
      component: QRCamera
    },
    {
      path: '*', redirect: '/' // Catch all other routes
    }
  ],
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
