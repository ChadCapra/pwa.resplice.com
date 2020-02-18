import { GroupState, GroupActions, FETCH_GROUPS } from './types'

const INITIAL_STATE: GroupState = {
  loading: false,
  error: null,
  groups: null,
  groups_loaded_at: null
}

export default (state = INITIAL_STATE, action: GroupActions): GroupState => {
  switch (action.type) {
    case FETCH_GROUPS:
      return {
        ...state,
        groups: action.payload || state.groups,
        loading: action.loading || false,
        error: action.error || null
      }
    default:
      return state
  }
}
