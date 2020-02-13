import {
  AuthState,
  AuthActions,
  SET_LOCALE,
  CREATE_SESSION,
  GET_SESSION,
  VERIFY_SESSION,
  ACCEPT_EULA,
  REGISTER,
  DELETE_SESSION
} from './types'

const INITIAL_STATE: AuthState = {
  loading: false,
  error: null,
  session: null,
  loginValues: null,
  locale: ''
}

export default (state = INITIAL_STATE, action: AuthActions): AuthState => {
  switch (action.type) {
    case SET_LOCALE:
      return { ...state, locale: action.payload }
    case CREATE_SESSION:
      return {
        ...state,
        session: (action.payload && action.payload.session) || null,
        loginValues: (action.payload && action.payload.loginValues) || null,
        loading: action.loading || false,
        error: action.error || null
      }
    case GET_SESSION:
    case VERIFY_SESSION:
    case ACCEPT_EULA:
    case REGISTER:
      return {
        ...state,
        session: action.payload || state.session,
        loading: action.loading || false,
        error: action.error || null
      }
    case DELETE_SESSION:
      return INITIAL_STATE
    default:
      return state
  }
}
