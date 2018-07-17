import Vue from 'vue'
import Router from 'vue-router'

// Sign In Components
import Signin from '@/signin/Signin'
import SignUp from '@/signin/Signup'
import Welcome from '@/signin/Welcome'

// Contact Components
import ContactList from '@/contacts/ContactList'
import Container from '@/contacts/Container'
// import GroupList from '@/contacts/GroupList'
// import Groups from '@/contacts/Groups'
import Map from '@/contacts/Map'
import Profile from '@/contacts/Profile'

// Share Components
import Share from '@/share/Share'
import Attributes from '@/share/Attributes'
import QRCamera from '@/share/QRCamera'
import Queue from '@/share/Queue'
import Notif from '@/share/Notif'

// Settings Components
import Appearance from '@/settings/Appearance'
import Language from '@/settings/Language'
import NotifSettings from '@/settings/NotifSettings'
import PrivacySafety from '@/settings/PrivacySafety'
import UserProfile from '@/settings/UserProfile'
import Settings from '@/settings/Settings'
import Setting from '@/settings/Setting'

// Skeleton Components
import ComingSoon from '@/skeleton/ComingSoon'

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
          path: '/share',
          name: 'Share',
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
          name: 'UserProfile',
          component: UserProfile
        },
        {
          path: 'privacy-safety',
          name: 'PrivacySafety',
          component: PrivacySafety
        },
        {
          path: 'notification',
          name: 'NotifSettings',
          component: NotifSettings
        },
        {
          path: 'appearance',
          name: 'Appearance',
          component: Appearance
        },
        {
          path: 'language',
          name: 'Language',
          component: Language
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
