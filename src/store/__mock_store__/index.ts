import { combineReducers } from 'redux'
import {
  UtilState,
  AuthState,
  UserState,
  GroupState,
  ContactState
} from '../store'
import { attributeTypes } from './attributeTypes'

const utilState: UtilState = {
  loading: false,
  error: null,
  attributeTypes,
  offline: false
}

const authState: AuthState = {
  loading: false,
  error: null,
  session: null,
  loginValues: null,
  locale: 'en-US'
}

const userState: UserState = {
  loading: false,
  error: null,
  profile: null,
  attributes: null,
  attributes_loaded_at: null
}

const groupState: GroupState = {
  loading: false,
  error: null,
  groups: null,
  groups_loaded_at: null
}

const contactState: ContactState = {
  loading: false,
  error: null,
  contacts: null,
  contacts_loaded_at: null
}

export default combineReducers({
  utilState: () => utilState,
  authState: () => authState,
  userState: () => userState,
  groupState: () => groupState,
  contactState: () => contactState
})
