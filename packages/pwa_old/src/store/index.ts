import { combineReducers } from 'redux'
import utilReducer from './util/utilReducer'
import authReducer from './auth/authReducer'
import userReducer from './user/userReducer'
import groupReducer from './group/groupReducer'
import contactReducer from './contact/contactReducer'

export default combineReducers({
  utilState: utilReducer,
  authState: authReducer,
  userState: userReducer,
  groupState: groupReducer,
  contactState: contactReducer
})
