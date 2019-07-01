import {
  FETCH_CONTACT_LIST,
  FETCH_CONTACT_LIST_SUCCESS,
  FETCH_CONTACT_LIST_FAILURE,
  FETCH_CONTACT,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_FAILURE,
  FETCH_ATTRIBUTE_TYPES_SUCCESS
} from '../actions/types'

import { processProfile, processSummaries } from '../../helpers'

const INITIAL_STATE = {
  loading: false,
  error: null,
  requested_at: null,
  contacts: {},
  types: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ATTRIBUTE_TYPES_SUCCESS:
      return { ...state, types: action.payload.ok }
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
        contacts: processProfile(
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
