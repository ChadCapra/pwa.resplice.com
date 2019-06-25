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
  LOGOUT
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  isAuthorized: false,
  isVerified: false,
  login: {},
  verify: {}
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
    case CREATE_PROFILE:
      return { ...state, loading: true }
    case CREATE_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload }
    case CREATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case VERIFY:
      return { ...state, loading: true }
    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        verify: action.payload,
        isVerified: action.payload.ok.access_token ? true : false
      }
    case VERIFY_FAILURE:
      return { ...state, loading: false, error: action.payload }
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
