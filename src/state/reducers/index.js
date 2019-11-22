import { combineReducers } from 'redux'
import userReducer from './userReducer'
import contactReducer from './contactReducer'
import groupReducer from './groupReducer'
import authReducer from './authReducer'
import utilReducer from './utilReducer'

export default combineReducers({
  userState: userReducer,
  contactState: contactReducer,
  groupState: groupReducer,
  authState: authReducer,
  utilState: utilReducer
})

// Reducer Case Pattern
// case TYPE:
//   return { ...state, loading: true }
// case TYPE_SUCCESS:
//   return { ...state, loading: false }
// case TYPE_FAILURE:
//   return { ...state, loading: false, error: action.payload.status }

// Sample data set
// contacts: {
//   ['somecontactuuid'] : {} // profile
// }
// attributes: {
//   ['somecontactuuid']: {
//     ['somecontactattributeuuid']: {
//       value: '',
//     } // atributes details
//   }
// }
// shares: {
//   ['somecontactuuid']: {
//     ['someuserattributeuuid']: {
//       expiry: ''
//     } // share details
//   }
// }
