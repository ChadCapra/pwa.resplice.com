import {
  SWIPED,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  FETCH_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  loading: true,
  error: null,
  offline: false,
  swipeIndex: 0,
  registrationExpirySec: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWIPED:
      return { ...state, swipeIndex: action.payload }
    case LOAD:
      return { ...state, loading: true }
    case LOAD_SUCCESS:
      return { ...state, loading: false }
    case LOAD_FAILURE:
      return { ...state, loading: false }
    case FETCH_SETTINGS:
      return { ...state }
    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        registrationExpirySec: action.payload.registration_expiry_seconds
      }
    case FETCH_SETTINGS_FAILURE:
      return { ...state, offline: true, error: action.payload }
    default:
      return state
  }
}
