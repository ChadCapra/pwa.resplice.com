import { RespliceState } from '../store'
import {
  Session,
  AuthActions,
  SET_LOCALE,
  CREATE_SESSION,
  GET_SESSION,
  VERIFY_SESSION,
  ACCEPT_EULA,
  REGISTER,
  DELETE_SESSION
} from './types'
import { ThunkAction } from 'redux-thunk'
import api from '../../api'

// export const actionName = (args: any): ThunkAction<void, RespliceState, null, ActionType> => async dispatch => {
//   dispatch({ type: ACTION_TYPE, loading: true })
//   try {
//     const response = await api.post('/url', args)
//     const arg: any = response.data
//     dispatch({
//       type: ACTION_TYPE,
//       payload: arg
//     })
//   } catch (err) {
//     dispatch({ type: ACTION_TYPE, error: err })
//   }
// }

export const setLocale = (locale: string) => {
  return {
    type: SET_LOCALE,
    payload: locale
  }
}

export const createSession = (values: {
  phone: string
  email: string
}): ThunkAction<
  Promise<void>,
  RespliceState,
  null,
  AuthActions
> => async dispatch => {
  dispatch({ type: CREATE_SESSION, loading: true })
  try {
    const response = await api.post('/auth/session/create', values)
    const session: Session = response.data.session
    dispatch({
      type: CREATE_SESSION,
      payload: { session, loginValues: values }
    })
  } catch (err) {
    dispatch({ type: CREATE_SESSION, error: err })
  }
}

export const getSession = (): ThunkAction<
  Promise<void>,
  RespliceState,
  null,
  AuthActions
> => async dispatch => {
  dispatch({ type: GET_SESSION, loading: true })
  try {
    const response = await api.get('/auth/session/get')
    const session: Session = response.data.session
    dispatch({ type: GET_SESSION, payload: session })
  } catch (err) {
    dispatch({ type: GET_SESSION, error: err })
  }
}

export const verifySession = (
  code: string
): ThunkAction<
  Promise<void>,
  RespliceState,
  null,
  AuthActions
> => async dispatch => {
  dispatch({ type: VERIFY_SESSION, loading: true })
  try {
    const response = await api.patch('/auth/session/verify', {
      verify_token: code
    })
    const session: Session = response.data.session
    dispatch({
      type: VERIFY_SESSION,
      payload: session
    })
  } catch (err) {
    dispatch({ type: VERIFY_SESSION, error: err })
  }
}

export const acceptEula = (
  locale: string
): ThunkAction<
  Promise<void>,
  RespliceState,
  null,
  AuthActions
> => async dispatch => {
  dispatch({ type: ACCEPT_EULA, loading: true })
  try {
    const response = await api.post('/auth/accept_eula', {
      eula_accepted: true,
      privacy_accepted: true,
      locale
    })
    const session: Session = response.data.session
    dispatch({
      type: ACCEPT_EULA,
      payload: session
    })
  } catch (err) {
    dispatch({ type: ACCEPT_EULA, error: err })
  }
}

export const register = (values: {
  name: string
  avatar: any
  street_address_1: string
  street_address_2: string
  locality: string
  region: string
  postal_code: string
  country: string
}): ThunkAction<
  Promise<void>,
  RespliceState,
  null,
  AuthActions
> => async dispatch => {
  dispatch({ type: REGISTER, loading: true })
  try {
    await api.post('/user/complete_profile', values)
    const response = await api.get('/auth/session/get')
    const session: Session = response.data.session
    dispatch({
      type: REGISTER,
      payload: session
    })
  } catch (err) {
    dispatch({ type: REGISTER, error: err })
  }
}

export const deleteSession = (): AuthActions => {
  return {
    type: DELETE_SESSION
  }
}
