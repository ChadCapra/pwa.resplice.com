import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import contactReducer from './contactReducer'
import userReducer from './userReducer'
import attributesReducer from './attributesReducer'
import utilReducer from './utilReducer'
import groupReducer from './groupReducer'
import shareReducer from './shareReducer'

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  contacts: contactReducer,
  groups: groupReducer,
  attributes: attributesReducer,
  shares: shareReducer,
  utils: utilReducer,
  form: formReducer
})

// Reducer Case Pattern
// case TYPE:
//   return { ...state, loading: true }
// case TYPE_SUCCESS:
//   return { ...state, loading: false }
// case TYPE_FAILURE:
//   return { ...state, loading: false, error: action.payload.status }
