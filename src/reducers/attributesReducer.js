import {
  FETCH_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE,
  ADD_ATTRIBUTE,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAILURE,
  EDIT_ATTRIBUTE,
  EDIT_ATTRIBUTE_SUCCESS,
  EDIT_ATTRIBUTE_FAILURE,
  DELETE_ATTRIBUTE,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_FAILURE,
  SHARE_ATTRIBUTES,
  SHARE_ATTRIBUTES_SUCCESS,
  SHARE_ATTRIBUTES_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  types: [],
  attribute: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SETTINGS:
      return { ...state, loading: true }
    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        types: action.payload.attribute_types
      }
    case FETCH_SETTINGS_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case ADD_ATTRIBUTE:
      return { ...state, loading: true }
    case ADD_ATTRIBUTE_SUCCESS:
      return { ...state, loading: false }
    case ADD_ATTRIBUTE_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
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
    case SHARE_ATTRIBUTES:
      return { ...state, loading: true }
    case SHARE_ATTRIBUTES_SUCCESS:
      return { ...state, loading: false }
    case SHARE_ATTRIBUTES_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    default:
      return state
  }
}
