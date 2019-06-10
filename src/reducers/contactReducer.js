import {
  FETCH_CONTACT_LIST,
  FETCH_CONTACT_LIST_SUCCESS,
  FETCH_CONTACT_LIST_FAILURE,
  FETCH_CONTACT,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  last_requested: null,
  contacts: []
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
    case FETCH_CONTACT:
      return { ...state, loading: true }
    case FETCH_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        collections: buildCollections(action.payload.data.attributes),
        profile: action.payload.profile
      }
    case FETCH_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCH_CONTACT_LIST:
      return { ...state, loading: true }
    case FETCH_CONTACT_LIST_SUCCESS:
      const { data: contacts, ...payload } = action.payload
      return { ...state, loading: false, contacts, ...payload }
    case FETCH_CONTACT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
