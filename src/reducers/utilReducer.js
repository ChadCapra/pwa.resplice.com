import { SWIPED, FETCH_SETTINGS } from '../actions/types'

export default (state = { swipeIndex: 0 }, action) => {
  switch (action.type) {
    case SWIPED:
      return { ...state, swipeIndex: action.payload }
    case FETCH_SETTINGS:
      return {
        ...state,
        registrationExpirySec: action.payload.registration_expiry_seconds
      }
    default:
      return state
  }
}
