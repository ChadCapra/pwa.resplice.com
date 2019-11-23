import { UtilState } from './util'
import { AnyAction } from 'redux'

const INITIAL_STATE: UtilState = {
  offline: false,
  globalLoading: false,
  globalError: null,
  attributeTypes: null
}

export default (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    default:
      return state
  }
}
