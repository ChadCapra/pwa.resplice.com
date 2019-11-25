import { UtilState, UtilActions, FETCH_ATTRIBUTE_TYPES } from './types'

const INITIAL_STATE: UtilState = {
  offline: false,
  globalLoading: false,
  globalError: null,
  attributeTypes: null
}

export default (state = INITIAL_STATE, action: UtilActions): UtilState => {
  switch (action.type) {
    case FETCH_ATTRIBUTE_TYPES:
      return {
        ...state,
        attributeTypes: action.payload || null,
        globalLoading: action.loading || false,
        globalError: action.error || null
      }
    default:
      return state
  }
}
