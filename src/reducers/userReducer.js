import {
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  ADD_ATTRIBUTE_SUCCESS,
  EDIT_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  last_requested: null,
  profile: {},
  attributes: [],
  collections: {},
  updates: []
}

const buildCollections = attributes => {
  const collections = {}
  attributes.forEach(attr => {
    collections[attr.collection]
      ? collections[attr.collection].push(attr)
      : (collections[attr.collection] = [attr])
  })
  return collections
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return { ...state, loading: true }
    case FETCH_PROFILE_SUCCESS:
      const { attributes, ...profile } = action.payload.data
      return {
        ...state,
        loading: false,
        last_requested: action.payload.request_at,
        profile,
        attributes,
        collections: buildCollections(action.payload.data.attributes)
      }
    case FETCH_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload.data }
    case ADD_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributes: action.payload,
        collections: buildCollections(action.payload)
      }
    case EDIT_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributes: action.payload,
        collections: buildCollections(action.payload)
      }
    case DELETE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributes: action.payload,
        collections: buildCollections(action.payload)
      }
    default:
      return state
  }
}
