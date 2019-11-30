import {
  UtilState,
  UtilActions,
  FETCH_ATTRIBUTE_TYPES,
  SET_OFFLINE
} from './types'

const INITIAL_STATE: UtilState = {
  loading: false,
  error: null,
  attributeTypes: null,
  offline: false
}

export default (state = INITIAL_STATE, action: UtilActions): UtilState => {
  switch (action.type) {
    case FETCH_ATTRIBUTE_TYPES:
      return {
        ...state,
        attributeTypes: action.payload || null,
        loading: action.loading || false,
        error: action.error || null
      }
    case SET_OFFLINE:
      return {
        ...state,
        offline: action.payload
      }
    default:
      return state
  }
}
