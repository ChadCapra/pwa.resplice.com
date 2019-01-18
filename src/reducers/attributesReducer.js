import { FETCH_TYPES } from '../actions/types'

const INITIAL_STATE = {
  types: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TYPES:
      return { ...state, types: action.payload }
    default:
      return state
  }
}
