import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  VERIFY,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  VERIFY_PASSWORD_RESET,
  VERIFY_PASSWORD_RESET_SUCCESS,
  VERIFY_PASSWORD_RESET_FAILURE,
  AUTHORIZE,
  FETCH_PROFILE_FAILURE,
  FETCH_CONTACT_LIST_FAILURE,
  FETCH_ATTRIBUTES_FAILURE,
  REMOVE_ERROR,
  LOGOUT
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  isAuthorized: false,
  register: null,
  resetPassword: null,
  verify: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        register: action.payload,
        isAuthorized: true
      }
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case LOGOUT:
      return { ...state, isAuthorized: false }
    case REGISTER:
      return { ...state, loading: true }
    case REGISTER_SUCCESS:
      return { ...state, loading: false, register: action.payload }
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case RESET_PASSWORD:
      return { ...state, loading: true }
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, resetPassword: action.payload }
    case RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FORGOT_PASSWORD:
      return { ...state, loading: true }
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, resetPassword: action.payload }
    case FORGOT_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case VERIFY:
      return { ...state, loading: true }
    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        verify: action.payload,
        isAuthorized: true
      }
    case VERIFY_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case VERIFY_PASSWORD_RESET:
      return { ...state, loading: true }
    case VERIFY_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        verify: action.payload,
        isAuthorized: true
      }
    case VERIFY_PASSWORD_RESET_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case AUTHORIZE:
      return { ...state, isAuthorized: true }
    case FETCH_PROFILE_FAILURE ||
      FETCH_CONTACT_LIST_FAILURE ||
      FETCH_ATTRIBUTES_FAILURE:
      if (action.payload.response.status === 401) {
        return { ...state, isAuthorized: false }
      } else {
        return state
      }
    case REMOVE_ERROR:
      return { ...state, error: null }
    default:
      return state
  }
}
