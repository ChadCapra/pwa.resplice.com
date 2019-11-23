import { UserState } from './user'
import { AnyAction } from 'redux'

const INITIAL_STATE: UserState = {
  profile: null,
  attributes: null,
  attributes_loaded_at: null
}

export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    default:
      return state
  }
}
