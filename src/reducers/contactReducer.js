import { FETCH_CONTACTS, FETCH_CONTACT } from '../actions/types'

const INITIAL_STATE = {
  list: [],
  profile: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, list: action.payload }
    case FETCH_CONTACT:
      return { ...state, profile: action.payload }
    default:
      return state
  }
}
