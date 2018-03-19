import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/signin/components/Signin'
import Container from '@/contacts/components/Container'
import Profile from '@/contacts/components/Profile'

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
      path: '/profile', // I want this to eventually go to a profile with a unique ID
      name: 'Profile',
      component: Profile
    }
  ]
})
