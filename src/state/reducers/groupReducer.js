import {
  FETCH_GROUP,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_FAILURE,
  FETCH_GROUP_LIST,
  FETCH_GROUP_LIST_SUCCESS,
  FETCH_GROUP_LIST_FAILURE,
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  groups: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GROUP:
      return { ...state, loading: true }
    case FETCH_GROUP_SUCCESS:
      return { ...state, loading: false, group: action.payload }
    case FETCH_GROUP_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCH_GROUP_LIST:
      return { ...state, loading: true }
    case FETCH_GROUP_LIST_SUCCESS:
      return { ...state, loading: false, groups: action.payload }
    case FETCH_GROUP_LIST_FAILURE:
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
