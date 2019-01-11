import { SIGN_IN, REGISTER, VERIFY } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, register: action.payload }
    case REGISTER:
      return { ...state, register: action.payload }
    case VERIFY:
      return { ...state, verify: action.payload }
    default:
      return state
  }
}
