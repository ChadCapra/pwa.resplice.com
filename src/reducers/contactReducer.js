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
  list: [],
  profile: {},
  collections: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACT:
      return { ...state, loading: true }
    case FETCH_CONTACT_SUCCESS:
      const collections = {}
      action.payload.attributes.forEach(attr => {
        collections[attr.collection]
          ? collections[attr.collection].push(attr)
          : (collections[attr.collection] = [attr])
      })
      return {
        ...state,
        loading: false,
        collections,
        profile: action.payload.profile
      }
    case FETCH_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCH_CONTACT_LIST:
      return { ...state, loading: true }
    case FETCH_CONTACT_LIST_SUCCESS:
      return { ...state, loading: false, list: action.payload }
    case FETCH_CONTACT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
