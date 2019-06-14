import {
  FETCH_CONTACT_LIST,
  FETCH_CONTACT_LIST_SUCCESS,
  FETCH_CONTACT_LIST_FAILURE,
  FETCH_CONTACT,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_FAILURE
} from '../actions/types'

import { processContact, processSummaries } from '../helpers'

const INITIAL_STATE = {
  loading: false,
  error: null,
  requested_at: null,
  contacts: {},
  types: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACT_LIST:
      return { ...state, loading: true }
    case FETCH_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: processSummaries({ ...state.contacts }, action.payload.ok),
        requested_at: action.payload.requested_at
      }
    case FETCH_CONTACT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCH_CONTACT:
      return { ...state, loading: true }
    case FETCH_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: processContact(
          { ...state.contacts },
          action.payload,
          state.types
        )
      }
    case FETCH_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
