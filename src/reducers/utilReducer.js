import {
  SWIPED,
  FETCH_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  swipeIndex: 0,
  registrationExpirySec: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWIPED:
      return { ...state, swipeIndex: action.payload }
    case FETCH_SETTINGS:
      return { ...state, loading: true }
    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        registrationExpirySec: action.payload.registration_expiry_seconds
      }
    case FETCH_SETTINGS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
