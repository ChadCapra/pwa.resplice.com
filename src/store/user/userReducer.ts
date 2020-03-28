import {
  UserState,
  UserActions,
  FETCH_USER_PROFILE,
  EDIT_USER_NAME,
  EDIT_USER_AVATAR,
  DELETE_USER,
  FETCH_USER_ATTRIBUTES,
  FETCH_USER_ATTRIBUTE,
  ADD_USER_ATTRIBUTE,
  EDIT_USER_ATTRIBUTE,
  VERIFY_USER_ATTRIBUTE,
  TOGGLE_QR_SHARABLE,
  DELETE_USER_ATTRIBUTE
} from './types'

import { toDictionary, omit } from '../../helpers'

const INITIAL_STATE: UserState = {
  loading: false,
  error: null,
  profile: null,
  attributes: null,
  attributes_loaded_at: null
}

export default (state = INITIAL_STATE, action: UserActions): UserState => {
  switch (action.type) {
    case FETCH_USER_PROFILE:
    case EDIT_USER_NAME:
    case EDIT_USER_AVATAR:
      return {
        ...state,
        profile: action.payload || state.profile,
        loading: action.loading || false,
        error: action.error || null
      }
    case DELETE_USER:
      return INITIAL_STATE
    case FETCH_USER_ATTRIBUTES:
      return {
        ...state,
        attributes:
          (action.payload && toDictionary('uuid', action.payload)) ||
          state.attributes,
        loading: action.loading || false,
        error: action.error || null
      }
    case FETCH_USER_ATTRIBUTE:
    case ADD_USER_ATTRIBUTE:
    case EDIT_USER_ATTRIBUTE:
    case VERIFY_USER_ATTRIBUTE:
    case TOGGLE_QR_SHARABLE:
      return {
        ...state,
        attributes:
          (action.payload && {
            ...state.attributes,
            [action.payload.uuid]: action.payload
          }) ||
          state.attributes,
        loading: action.loading || false,
        error: action.error || null
      }
    case DELETE_USER_ATTRIBUTE:
      return {
        ...state,
        attributes:
          (action.payload &&
            state.attributes &&
            omit(action.payload, state.attributes)) ||
          state.attributes,
        loading: action.loading || false,
        error: action.error || null
      }
    default:
      return state
  }
}
