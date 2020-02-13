import { combineReducers } from 'redux'
import utilReducer from './util/utilReducer'
import authReducer from './auth/authReducer'
import userReducer from './user/userReducer'

export default combineReducers({
  utilState: utilReducer,
  authState: authReducer,
  userState: userReducer
  // contactState: contactReducer,
  // groupState: groupReducer
})
