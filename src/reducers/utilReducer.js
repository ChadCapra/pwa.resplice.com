import { SWIPED } from '../actions/types'

export default (state = { swipeIndex: 1 }, action) => {
  switch (action.type) {
    case SWIPED:
      return { ...state, swipeIndex: action.payload }
    default:
      return state
  }
}
