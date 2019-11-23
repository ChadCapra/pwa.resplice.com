import { AuthState, AuthActions, CREATE_SESSION, VERIFY_SESSION } from './types'

const INITIAL_STATE: AuthState = {
  loading: false,
  error: null,
  session: null,
  loginValues: null
}

export default (state = INITIAL_STATE, action: AuthActions): AuthState => {
  switch (action.type) {
    case CREATE_SESSION:
      return {
        ...state,
        session: (action.payload && action.payload.session) || null,
        loginValues: (action.payload && action.payload.loginValues) || null,
        loading: action.loading || false,
        error: action.error || null
      }
    case VERIFY_SESSION:
      return {
        ...state,
        session: action.payload || state.session || null,
        loading: action.loading || false,
        error: action.error || null
      }
    default:
      return state
  }
}
