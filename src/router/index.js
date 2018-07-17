import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/signin/Signin'
import SignUp from '@/signin/Signup'
import Container from '@/contacts/Container'
import Profile from '@/contacts/Profile'
import Notif from '@/share/Notif'
// import Groups from '@/contacts/Groups'
import Map from '@/contacts/Map'
import UserProfile from '@/settings/UserProfile'
import Settings from '@/settings/Settings'
import Setting from '@/settings/Setting'
import ContactList from '@/contacts/ContactList'
import Welcome from '@/signin/Welcome'
// import GroupList from '@/contacts/GroupList'
import Share from '@/share/Share'
import Attributes from '@/share/Attributes'
import ComingSoon from '@/skeleton/ComingSoon'
import QRCamera from '@/share/QRCamera'
import Queue from '@/share/Queue'

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
          path: '/pending',
          component: Queue
        },
        {
          path: '/settings',
          component: Settings
        }
      ]
    },
    {
      path: '/settings',
      component: Setting,
      children: [
        {
          path: 'userprofile',
          component: UserProfile
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
      path: '/notif',
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
      path: '/map',
      name: 'Map',
      component: Map
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
