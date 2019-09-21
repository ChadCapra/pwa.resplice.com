import api, { updateLocationHeaders, mockApi } from '../../api'
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
    const response = await api.post('/session/create', values)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
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

export const authenticateSession = code => async dispatch => {
  dispatch({ type: VERIFY })

  try {
    const { data: session } = await mockApi.patch('/session/authenticate', {
      verify_token: code
    })

    if (session.authorized_at && session.profile_complete) {
      // Set auth header on axios instance
      api.defaults.headers.common['access_token'] = session.access_token
      api.defaults.headers.common['session_uuid'] = session.uuid
      // Set auth token and uuid in browser storage
      localStorage.setItem('access_token', session.access_token)
      localStorage.setItem('session_uuid', session.uuid)
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
