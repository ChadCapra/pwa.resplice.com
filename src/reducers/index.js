import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import loginReducer from './loginReducer'
import contactReducer from './contactReducer'
import userReducer from './userReducer'
import attributesReducer from './attributesReducer'
import utilReducer from './utilReducer'

export default combineReducers({
  login: loginReducer,
  contacts: contactReducer,
  user: userReducer,
  form: formReducer,
  utils: utilReducer,
  attributes: attributesReducer
})
