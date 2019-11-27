import { GroupState, GroupActions } from './types'

const INITIAL_STATE: GroupState = {
  loading: false,
  error: null,
  groups: null,
  groups_loaded_at: null
}

export default (state = INITIAL_STATE, action: GroupActions): GroupState => {
  switch (action.payload) {
    default:
      return state
  }
}
