import api from '../api'
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  VERIFY_PASSWORD_RESET,
  VERIFY_PASSWORD_RESET_SUCCESS,
  VERIFY_PASSWORD_RESET_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  REMOVE_ERROR
} from './types'

export const login = formValues => async dispatch => {
  dispatch({ type: LOGIN })

  try {
    const response = await api.post('/login', formValues)
    dispatch({ type: LOGIN_SUCCESS, payload: response.data })
    // Set auth header on axios instance
    api.defaults.headers.common['access_key'] = response.data.data.access_key
    api.defaults.headers.common['user_uuid'] = response.data.data.user_uuid
    // Set auth token and uuid in browser storage
    localStorage.setItem('access_key', response.data.data.access_key)
    localStorage.setItem('user_uuid', response.data.data.user_uuid)
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.response })
  }
}

export const logout = () => {
  // TODO: cleanup service worker caches and other data
  // Remove auth header on axios instance and items in storage
  api.defaults.headers.common['access_key'] = null
  api.defaults.headers.common['user_uuid'] = null
  localStorage.removeItem('access_key')
  localStorage.removeItem('user_uuid')
  return {
    type: LOGOUT
  }
}

export const register = formValues => async dispatch => {
  dispatch({ type: REGISTER })

  try {
    const response = await api.post('/register', formValues)
    dispatch({ type: REGISTER_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: REGISTER_FAILURE, payload: err.response })
  }
}

export const verifyAttributes = verifyObject => async dispatch => {
  dispatch({ type: VERIFY })

  try {
    const response = await api.post('/verify_registration', verifyObject)

    dispatch({ type: VERIFY_SUCCESS, payload: response.data })
    // Set auth header on axios instance
    api.defaults.headers.common['access_key'] = response.data.data.access_key
    api.defaults.headers.common['user_uuid'] = response.data.data.user_uuid
    // Set auth token and uuid in browser storage
    localStorage.setItem('access_key', response.data.data.access_key)
    localStorage.setItem('user_uuid', response.data.data.user_uuid)
  } catch (err) {
    dispatch({ type: VERIFY_FAILURE, payload: err.response })
  }
}

export const forgotPassword = formValues => async dispatch => {
  dispatch({ type: FORGOT_PASSWORD })

  try {
    const response = await api.post('/forgot_password', formValues)
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: err.response })
  }
}

export const verifyPasswordReset = verifyObject => async dispatch => {
  dispatch({ type: VERIFY_PASSWORD_RESET })

  try {
    const response = await api.post('/verify_forgot_password', verifyObject)
    dispatch({ type: VERIFY_PASSWORD_RESET_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: VERIFY_PASSWORD_RESET_FAILURE, payload: err.response })
  }
}

export const resetPassword = formValues => async dispatch => {
  dispatch({ type: RESET_PASSWORD })

  try {
    const response = await api.post('/reset_password', formValues)
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: err.response })
  }
}

export const removeError = () => {
  return {
    type: REMOVE_ERROR
  }
}
