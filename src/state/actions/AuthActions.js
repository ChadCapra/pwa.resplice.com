import api from '../../api'
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
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

export const logout = tokens => async dispatch => {
  await api.delete('/logout', tokens)
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

    if (response.data.ok.access_token) {
      // Set auth header on axios instance
      api.defaults.headers.common['access_token'] =
        response.data.ok.access_token
      api.defaults.headers.common['user_uuid'] = response.data.ok.user_uuid
      // Set auth token and uuid in browser storage
      localStorage.setItem('access_token', response.data.ok.access_token)
      localStorage.setItem('user_uuid', response.data.ok.user_uuid)
    }

    dispatch({ type: VERIFY_SUCCESS, payload: response.data })
  } catch (err) {
    console.log(JSON.stringify(err))
    dispatch({ type: VERIFY_FAILURE, payload: err })
  }
}

export const removeError = () => {
  return {
    type: REMOVE_ERROR
  }
}
