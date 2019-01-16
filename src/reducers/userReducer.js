import { FETCH_PROFILE } from '../actions/types'

const INITIAL_STATE = {
  profile: {},
  updates: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return { ...state, profile: action.payload }
    default:
      return state
  }
}
