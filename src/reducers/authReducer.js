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
  AUTHORIZE
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  isAuthorized: false,
  register: null,
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
      return { ...state, loading: false, error: action.payload.status }
    case REGISTER:
      return { ...state, loading: true }
    case REGISTER_SUCCESS:
      return { ...state, loading: false, register: action.payload }
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
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
    case AUTHORIZE:
      return { ...state, isAuthorized: true }
    default:
      return state
  }
}
