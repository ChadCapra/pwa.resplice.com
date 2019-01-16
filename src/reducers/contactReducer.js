import { FETCH_CONTACTS } from '../actions/types'

const INITIAL_STATE = {
  list: [],
  profile: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, list: action.payload }
    default:
      return state
  }
}
