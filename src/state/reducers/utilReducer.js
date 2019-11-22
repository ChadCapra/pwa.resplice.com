import {
  SWIPED,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  UPDATE_QUERY,
  CLEAR_QUERY,
  UPDATE_SEARCH_TAGS,
  CLEAR_SEARCH_TAGS
} from '../actions/types'

const INITIAL_STATE = {
  globalLoading: true,
  globalError: null,
  offline: false,
  swipeIndex: 0,
  search: {
    query: '',
    tags: []
  },
  attributeTypes: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWIPED:
      return { ...state, swipeIndex: action.payload }
    case UPDATE_QUERY:
      return { ...state, search: { ...state.search, query: action.payload } }
    case CLEAR_QUERY:
      return { ...state, search: { ...state.search, query: '' } }
    case UPDATE_SEARCH_TAGS:
      return { ...state, search: { ...state.search, tags: action.payload } }
    case CLEAR_SEARCH_TAGS:
      return { ...state, search: { ...state.search, tags: [] } }
    case LOAD:
      return { ...state, globalLoading: true }
    case LOAD_SUCCESS:
      return {
        ...state,
        offline: false,
        globalLoading: false,
        globalError: null
      }
    case LOAD_FAILURE:
      return {
        ...state,
        offline: true,
        globalLoading: false,
        globalError: action.payload
      }
    default:
      return state
  }
}
