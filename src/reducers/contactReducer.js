import {
  FETCH_CONTACTS,
  FETCH_CONTACT,
  FETCH_CONTACT_ATTRIBUTES
} from '../actions/types'

const INITIAL_STATE = {
  list: [],
  profile: {},
  collections: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACT_ATTRIBUTES:
      const collections = {}
      action.payload.forEach(attr => {
        collections[attr.collection]
          ? collections[attr.collection].push(attr)
          : (collections[attr.collection] = [attr])
      })
      return { ...state, collections }
    case FETCH_CONTACTS:
      return { ...state, list: action.payload }
    case FETCH_CONTACT:
      return { ...state, profile: action.payload }
    default:
      return state
  }
}
