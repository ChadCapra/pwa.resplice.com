import { RespliceState } from '../store'
import { Session, AuthActions, CREATE_SESSION, VERIFY_SESSION } from './types'
import { ThunkAction } from 'redux-thunk'
import api from '../../api'

// export const actionName = (args: any): ThunkAction<void, RespliceState, null, ActionType> => async dispatch => {
//   dispatch({ type: ACTION_TYPE, loading: true, error: null })
//   try {
//     const response = await api.post('/url', args)
//     const arg: any = response.data
//     dispatch({
//       type: ACTION_TYPE,
//       payload: arg,
//       loading: false
//     })
//   } catch (err) {
//     dispatch({ type: ACTION_TYPE, loading: false, error: err })
//   }
// }

export const createSession = (values: {
  phone: string
  email: string
}): ThunkAction<void, RespliceState, null, AuthActions> => async dispatch => {
  dispatch({ type: CREATE_SESSION, loading: true, error: null })
  try {
    const response = await api.post('/auth/session/create', values)
    const session: Session = response.data.session
    dispatch({
      type: CREATE_SESSION,
      payload: { session, loginValues: values },
      loading: false
    })
  } catch (err) {
    dispatch({ type: CREATE_SESSION, loading: false, error: err })
  }
}

export const verifySession = (
  code: string
): ThunkAction<void, RespliceState, null, AuthActions> => async dispatch => {
  dispatch({ type: VERIFY_SESSION, loading: true, error: null })
  try {
    const response = await api.patch('/auth/session/verify', {
      verify_token: code
    })
    const session: Session = response.data
    dispatch({
      type: VERIFY_SESSION,
      payload: session,
      loading: false
    })
  } catch (err) {
    dispatch({ type: VERIFY_SESSION, loading: false, error: err })
  }
}
