import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY,
  VERIFY_SUCCESS,
  VERIFY_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  isAuthorized: false,
  register: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, loading: true }
    case SIGN_IN_SUCCESS:
      return { ...state, register: action.payload }
    case SIGN_IN_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case REGISTER:
      return { ...state, loading: true }
    case REGISTER_SUCCESS:
      return { ...state, register: action.payload }
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case VERIFY:
      return { ...state, loading: true }
    case VERIFY_SUCCESS:
      return { ...state, verify: action.payload }
    case VERIFY_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    default:
      return state
  }
}
