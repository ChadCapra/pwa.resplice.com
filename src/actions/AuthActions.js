import api from '../api'
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
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

export const createProfile = formValues => async dispatch => {
  dispatch({ type: CREATE_PROFILE })

  try {
    const response = await api.post('/user/create_profile', formValues)
    dispatch({ type: CREATE_PROFILE_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: CREATE_PROFILE_FAILURE, payload: err.response })
  }
}

export const verifyAttributes = verifyObject => async dispatch => {
  dispatch({ type: VERIFY })

  try {
    const response = await api.patch('/verify_login', verifyObject)

    dispatch({ type: VERIFY_SUCCESS, payload: response.data })

    if (response.data.ok.access_token) {
      // Set auth header on axios instance
      api.defaults.headers.common['access_token'] =
        response.data.ok.access_token
      api.defaults.headers.common['user_uuid'] = response.data.ok.user_uuid
      // Set auth token and uuid in browser storage
      localStorage.setItem('access_token', response.data.ok.access_token)
      localStorage.setItem('user_uuid', response.data.ok.user_uuid)
    }
  } catch (err) {
    JSON.stringify(err)
    console.log(err)
    dispatch({ type: VERIFY_FAILURE, payload: err })
  }
}

export const removeError = () => {
  return {
    type: REMOVE_ERROR
  }
}
