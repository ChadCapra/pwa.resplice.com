import { SWIPED, LOAD, LOAD_SUCCESS, LOAD_FAILURE } from '../actions/types'

const INITIAL_STATE = {
  loading: true,
  error: null,
  offline: false,
  swipeIndex: 0
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
      return { ...state, offline: true, loading: false }
    default:
      return state
  }
}
