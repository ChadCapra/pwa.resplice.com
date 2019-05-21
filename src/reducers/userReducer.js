import {
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_ATTRIBUTES,
  FETCH_ATTRIBUTES_SUCCESS,
  FETCH_ATTRIBUTES_FAILURE,
  ADD_ATTRIBUTE_SUCCESS,
  EDIT_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  last_requested: null,
  profile: {},
  updates: [],
  collections: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return { ...state, loading: true }
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        last_requested: action.payload.request_at,
        profile: action.payload.data
      }
    case FETCH_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload.data }
    case FETCH_ATTRIBUTES:
      return { ...state, loading: true }
    case FETCH_ATTRIBUTES_SUCCESS:
      const collections = {}
      action.payload.data.forEach(attr => {
        collections[attr.collection]
          ? collections[attr.collection].push(attr)
          : (collections[attr.collection] = [attr])
      })
      return { ...state, collections }
    case FETCH_ATTRIBUTES_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case ADD_ATTRIBUTE_SUCCESS:
      return { ...state, collections: action.payload.data }
    case EDIT_ATTRIBUTE_SUCCESS:
      return { ...state, collections: action.payload.data }
    case DELETE_ATTRIBUTE_SUCCESS:
      return { ...state, collections: action.payload.data }
    default:
      return state
  }
}
