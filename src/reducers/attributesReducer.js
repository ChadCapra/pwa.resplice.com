import {
  FETCH_ATTRIBUTES,
  FETCH_TYPES,
  FETCH_CONTACT_ATTRIBUTES
} from '../actions/types'

const INITIAL_STATE = {
  types: [],
  collections: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ATTRIBUTES || FETCH_CONTACT_ATTRIBUTES:
      const collections = {}
      action.payload.forEach(attr => {
        collections[attr.collection]
          ? collections[attr.collection].push(attr)
          : (collections[attr.collection] = [attr])
      })
      return { ...state, collections }
    case FETCH_TYPES:
      return { ...state, types: action.payload }
    default:
      return state
  }
}
