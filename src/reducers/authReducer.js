import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  AUTHORIZE,
  FETCH_PROFILE_FAILURE,
  FETCH_CONTACT_LIST_FAILURE,
  REMOVE_ERROR,
  LOGOUT
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  isAuthorized: false,
  isVerified: false,
  login: {},
  verify: {},
  register: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        login: { ...action.payload.data, values: action.payload.formValues }
      }
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case LOGOUT:
      return INITIAL_STATE
    case REGISTER:
      return { ...state, loading: true }
    case REGISTER_SUCCESS:
      return { ...state, loading: false, register: action.payload }
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case VERIFY:
      return { ...state, loading: true }
    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        verify: action.payload,
        isVerified: action.payload.data.access_token ? true : false
      }
    case VERIFY_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case AUTHORIZE:
      return { ...state, isAuthorized: true }
    case FETCH_PROFILE_FAILURE || FETCH_CONTACT_LIST_FAILURE:
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
