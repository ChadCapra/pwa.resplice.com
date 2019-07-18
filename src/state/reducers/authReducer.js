import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  VERIFY,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  AUTHORIZE,
  FETCH_PROFILE_FAILURE,
  FETCH_CONTACT_LIST_FAILURE,
  REMOVE_ERROR,
  LOGOUT,
  CLEAR_LOGIN
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  isAuthorized: false,
  isVerified: false,
  login: null,
  verification: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
    case CREATE_PROFILE:
    case VERIFY:
      return { ...state, loading: true }
    case AUTHORIZE:
      return { ...state, isAuthorized: true }
    case LOGOUT:
      return INITIAL_STATE
    case CLEAR_LOGIN:
      return INITIAL_STATE
    case REMOVE_ERROR:
      return { ...state, error: null }

    case LOGIN_SUCCESS:
      return { ...state, loading: false, login: action.payload }
    case CREATE_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload }
    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        verification: action.payload,
        isVerified: action.payload.access_token ? true : false
      }

    case LOGIN_FAILURE:
    case CREATE_PROFILE_FAILURE:
    case VERIFY_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCH_PROFILE_FAILURE:
    case FETCH_CONTACT_LIST_FAILURE:
      if (action.payload.status === 401) {
        return { ...state, isAuthorized: false }
      } else {
        return state
      }
    default:
      return state
  }
}
