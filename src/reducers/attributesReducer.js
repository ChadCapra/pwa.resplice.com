import {
  FETCH_ATTRIBUTE_TYPES,
  FETCH_ATTRIBUTE_TYPES_SUCCESS,
  FETCH_ATTRIBUTE_TYPES_FAILURE,
  ADD_ATTRIBUTE,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAILURE,
  EDIT_ATTRIBUTE,
  EDIT_ATTRIBUTE_SUCCESS,
  EDIT_ATTRIBUTE_FAILURE,
  DELETE_ATTRIBUTE,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  types: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ATTRIBUTE_TYPES:
      return { ...state, loading: true }
    case FETCH_ATTRIBUTE_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        types: action.payload.data
      }
    case FETCH_ATTRIBUTE_TYPES_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case ADD_ATTRIBUTE:
      return { ...state, loading: true }
    case ADD_ATTRIBUTE_SUCCESS:
      return { ...state, loading: false }
    case ADD_ATTRIBUTE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case EDIT_ATTRIBUTE:
      return { ...state, loading: true }
    case EDIT_ATTRIBUTE_SUCCESS:
      return { ...state, loading: false }
    case EDIT_ATTRIBUTE_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case DELETE_ATTRIBUTE:
      return { ...state, loading: true }
    case DELETE_ATTRIBUTE_SUCCESS:
      return { ...state, loading: false }
    case DELETE_ATTRIBUTE_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    default:
      return state
  }
}
