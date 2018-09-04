import Vue from 'vue'
import Router from 'vue-router'

// Sign In Components
import AttribVerification from '@/components/signin/AttribVerification'
import ForgotPassword from '@/components/signin/ForgotPassword'
import LoginFlow from '@/views/LoginFlow'
import OneMatch from '@/components/signin/OneMatch'
import ProfilePicUpload from '@/components/signin/ProfilePicUpload'
import ResetPassword from '@/components/signin/ResetPassword'
import SignIn from '@/views/SignIn'
import SignUp from '@/views/SignUp'
import Welcome from '@/views/ReWelcome'

// Contact Components
import ContactList from '@/views/ContactList'
import ReContainer from '@/views/ReContainer'
// import GroupList from '@/components/contacts/GroupList'
// import ReGroups from '@/views/ReGroups'
import ReMap from '@/views/ReMap'
import ReProfile from '@/views/ReProfile'

// Share Components
import Share from '@/views/ReShare'
import Attributes from '@/components/share/ReAttributes'
import QRCamera from '@/components/share/QRCamera'
import Queue from '@/views/ReQueue'
import Notif from '@/components/share/ReNotif'

// Settings Components
import AppearanceSettings from '@/components/settings/AppearanceSettings'
import LanguageSettings from '@/components/settings/LanguageSettings'
import NotifSettings from '@/components/settings/NotifSettings'
import PrivacySafety from '@/components/settings/PrivacySafety'
import UserProfile from '@/components/settings/UserProfile'
import SettingsPage from '@/views/SettingsPage'
import SettingPage from '@/components/settings/SettingPage'
import SettingsStatic from '@/components/settings/SettingsStatic'

// Skeleton Components
import ComingSoon from '@/components/skeleton/ComingSoon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ReContainer,
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
          path: '/reset-password',
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
      component: ReProfile
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
      component: ReMap
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
