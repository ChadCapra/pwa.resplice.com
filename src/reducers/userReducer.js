import { FETCH_PROFILE, FETCH_ATTRIBUTES } from '../actions/types'

const INITIAL_STATE = {
  profile: {},
  updates: [],
  collections: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ATTRIBUTES:
      const collections = {}
      action.payload.forEach(attr => {
        collections[attr.collection]
          ? collections[attr.collection].push(attr)
          : (collections[attr.collection] = [attr])
      })
      return { ...state, collections }
    case FETCH_PROFILE:
      return { ...state, profile: action.payload }
    default:
      return state
  }
}
