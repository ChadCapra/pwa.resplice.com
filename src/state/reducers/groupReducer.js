import {
  FETCH_GROUP,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_FAILURE,
  FETCH_GROUP_LIST,
  FETCH_GROUP_LIST_SUCCESS,
  FETCH_GROUP_LIST_FAILURE,
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  FETCH_ATTRIBUTE_TYPES_SUCCESS
} from '../actions/types'

import { processSummaries, processProfile } from '../../helpers'

const INITIAL_STATE = {
  loading: false,
  error: null,
  requested_at: null,
  groups: {},
  types: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ATTRIBUTE_TYPES_SUCCESS:
      return { ...state, types: action.payload.ok }
    case FETCH_GROUP_LIST:
      return { ...state, loading: true }
    case FETCH_GROUP_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: processSummaries({ ...state.groups }, action.payload.ok),
        requested_at: action.payload.requested_at
      }
    case FETCH_GROUP_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCH_GROUP:
      return { ...state, loading: true }
    case FETCH_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: processProfile({ ...state.groups }, action.payload, state.types)
      }
    case FETCH_GROUP_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case CREATE_GROUP:
      return { ...state, loading: true }
    case CREATE_GROUP_SUCCESS:
    case CREATE_GROUP_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
