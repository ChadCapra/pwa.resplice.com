import api, { updateLocationHeaders } from '../../api'
import { parseError } from '../../helpers'
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  VERIFY,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  CLEAR_ERROR,
  CLEAR_LOGIN
} from './types'
import { fetchAttributeTypes } from './AttributeActions'
import { fetchUserProfile } from './UserActions'
import { fetchContactList } from './ContactActions'
import { fetchGroupList } from './GroupActions'

export const login = (values, pos) => async dispatch => {
  dispatch({ type: LOGIN, payload: values })

  try {
    updateLocationHeaders(api, pos)
    const { data: session } = await api.post('/session/create', values)

    api.defaults.headers.common['access-token'] = session.access_token
    api.defaults.headers.common['session-uuid'] = session.uuid
    localStorage.setItem('access-token', session.access_token)
    localStorage.setItem('session-uuid', session.uuid)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: session
    })
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: parseError(err) })
  }
}

export const logout = tokens => async dispatch => {
  console.log(tokens)
  await api.delete('/logout', { params: { access_tokens: tokens } })
  // TODO: cleanup service worker caches and other data
  // Remove auth header on axios instance and items in storage
  api.defaults.headers.common['access_token'] = null
  api.defaults.headers.common['user_uuid'] = null
  localStorage.removeItem('access_token')
  localStorage.removeItem('user_uuid')
  dispatch({ type: LOGOUT })
}

export const verifySession = code => async dispatch => {
  dispatch({ type: VERIFY })

  try {
    const { data: session } = await api.patch('/session/verify', {
      verify_token: code
    })

    if (session.authenticated_at && session.profile_complete) {
      await dispatch(fetchAttributeTypes())
      await dispatch(fetchUserProfile())
      await dispatch(fetchGroupList())
      await dispatch(fetchContactList())
    }

    dispatch({
      type: VERIFY_SUCCESS,
      payload: session
    })
  } catch (err) {
    dispatch({ type: VERIFY_FAILURE, payload: err })
  }
}

export const clearLogin = () => {
  return { type: CLEAR_LOGIN }
}

export const clearError = () => {
  return { type: CLEAR_ERROR }
}
