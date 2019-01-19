import { FETCH_SETTINGS } from '../actions/types'

const INITIAL_STATE = {
  types: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SETTINGS:
      return { ...state, types: action.payload.attribute_types }
    default:
      return state
  }
}
