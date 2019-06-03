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
  REMOVE_ERROR
} from './types'

export const login = formValues => async dispatch => {
  dispatch(logout())
  dispatch({ type: LOGIN })

  try {
    const response = await api.post('/login', formValues)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { formValues, data: response.data }
    })
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.response })
  }
}

export const logout = () => {
  // TODO: cleanup service worker caches and other data
  // Remove auth header on axios instance and items in storage
  api.defaults.headers.common['access_token'] = null
  api.defaults.headers.common['user_uuid'] = null
  localStorage.removeItem('access_token')
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
    const response = await api.post('/verify_login', verifyObject)

    dispatch({ type: VERIFY_SUCCESS, payload: response.data })

    if (response.data.data.access_token) {
      // Set auth header on axios instance
      api.defaults.headers.common['access_token'] =
        response.data.data.access_token
      api.defaults.headers.common['user_uuid'] = response.data.data.user_uuid
      // Set auth token and uuid in browser storage
      localStorage.setItem('access_token', response.data.data.access_token)
      localStorage.setItem('user_uuid', response.data.data.user_uuid)
    }
  } catch (err) {
    dispatch({ type: VERIFY_FAILURE, payload: err.response })
  }
}

export const removeError = () => {
  return {
    type: REMOVE_ERROR
  }
}
