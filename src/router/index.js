import Vue from 'vue'
import Router from 'vue-router'
// import store from './store/store.js'

// Sign In Components
import AttribVerification from '@/signin/AttribVerification'
import ForgotPassword from '@/signin/ForgotPassword'
import LoginFlow from '@/signin/LoginFlow'
import OneMatch from '@/signin/OneMatch'
import ProfilePicUpload from '@/signin/ProfilePicUpload'
import ResetPassword from '@/signin/ResetPassword'
import SignIn from '@/signin/SignIn'
import SignUp from '@/signin/SignUp'
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
import AppearanceSettings from '@/settings/AppearanceSettings'
import LanguageSettings from '@/settings/LanguageSettings'
import NotifSettings from '@/settings/NotifSettings'
import PrivacySafety from '@/settings/PrivacySafety'
import UserProfile from '@/settings/UserProfile'
import SettingsPage from '@/settings/SettingsPage'
import SettingPage from '@/settings/SettingPage'
import SettingsStatic from '@/settings/SettingsStatic'

// Skeleton Components
import ComingSoon from '@/skeleton/ComingSoon'

Vue.use(Router)

const router = new Router({
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
          component: SettingsPage
        }
      ]
    },
    {
      path: '/settings',
      component: SettingPage,
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
          component: AppearanceSettings
        },
        {
          path: 'language',
          name: 'Language',
          component: LanguageSettings
        },
        {
          path: ':name',
          name: 'Information',
          component: SettingsStatic
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginFlow,
      children: [
        {
          path: '/signin',
          name: 'Signin',
          component: SignIn
        },
        {
          path: '/signup',
          name: 'SignUp',
          component: SignUp
        },
        {
          path: '/forgot-password',
          name: 'ForgotPassword',
          component: ForgotPassword
        },
        {
          path: '/one-match',
          name: 'OneMatch',
          component: OneMatch
        },
        {
          path: 'reset-password',
          name: 'ResetPassword',
          component: ResetPassword
        },
        {
          path: '/verify',
          name: 'AttribVerification',
          component: AttribVerification
        },
        {
          path: '/profile-upload',
          name: 'ProfilePicUpload',
          component: ProfilePicUpload
        }
      ]
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

// router.beforeEach((to, from, next) => {
//   if (!store.stateloggedIn) {
//     switch (to.name) {
//       case 'SignIn':
//         next()
//         break
//       case 'SignUp':
//         next()
//         break
//       case 'Welcome':
//         next()
//         break
//       default:
//         next(false)
//         break
//     }
//   } else {
//     next()
//   }
// })

export default router
