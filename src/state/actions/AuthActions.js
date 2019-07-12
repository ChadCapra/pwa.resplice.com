import api from '../../api'
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  VERIFY,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  REMOVE_ERROR,
  CLEAR_LOGIN
} from './types'
import { fetchAttributeTypes } from './AttributeActions'
import { fetchUserProfile } from './UserActions'
import { fetchContactList } from './ContactActions'
import { fetchGroupList } from './GroupActions'

export const login = formValues => async dispatch => {
  dispatch({ type: LOGIN })

  try {
    const response = await api.post('/login', formValues)
    const {
      requested_at,
      ok: { ...data }
    } = response.data
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { values: formValues, requested_at, ...data }
    })
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.response })
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

export const verifyAttributes = verifyObject => async dispatch => {
  dispatch({ type: VERIFY })

  try {
    const response = await api.patch('/verify_login', verifyObject)
    const {
      requested_at,
      ok: { ...data }
    } = response.data

    if (data.access_token) {
      // Set auth header on axios instance
      api.defaults.headers.common['access_token'] = data.access_token
      api.defaults.headers.common['user_uuid'] = data.user_uuid
      // Set auth token and uuid in browser storage
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('user_uuid', data.user_uuid)
      await dispatch(fetchAttributeTypes())
      await dispatch(fetchUserProfile())
      await dispatch(fetchGroupList())
      await dispatch(fetchContactList())
    }

    dispatch({ type: VERIFY_SUCCESS, payload: { requested_at, ...data } })
  } catch (err) {
    console.log(err)
    console.log(JSON.stringify(err))
    dispatch({ type: VERIFY_FAILURE, payload: err })
  }
}

export const clearLogin = () => {
  return { type: CLEAR_LOGIN }
}

export const removeError = () => {
  return { type: REMOVE_ERROR }
}
