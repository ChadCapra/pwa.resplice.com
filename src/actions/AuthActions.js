import api from '../api'
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
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
  RESET_PASSWORD_FAILURE
} from './types'

export const signIn = formValues => async dispatch => {
  dispatch({ type: SIGN_IN })

  try {
    const response = await api.post('/signin', formValues)
    dispatch({ type: SIGN_IN_SUCCESS, payload: response.data })
    // Set auth header on axios instance
    api.defaults.headers.common['Authorization'] = response.data.auth_token
  } catch (err) {
    dispatch({ type: SIGN_IN_FAILURE, payload: err.response })
  }
}

export const signOut = () => {
  // TODO: cleanup caches and other data
  // Remove auth header on axios instance
  api.defaults.headers.common['Authorization'] = null
  return {
    type: SIGN_OUT
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

export const verifyAttribute = (
  verification_token,
  { uuid }
) => async dispatch => {
  dispatch({ type: VERIFY })

  try {
    const response = await api.post('/verify_registration', {
      uuid,
      verification_token
    })
    dispatch({ type: VERIFY_SUCCESS, payload: response.data })
    // Set auth header on axios instance
    api.defaults.headers.common['Authorization'] = response.data.auth_token
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

export const verifyPasswordReset = (
  verification_token,
  { uuid }
) => async dispatch => {
  dispatch({ type: VERIFY_PASSWORD_RESET })

  try {
    const response = await api.post('/verify_password_reset', {
      uuid,
      verification_token
    })
    dispatch({ type: VERIFY_PASSWORD_RESET_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: VERIFY_PASSWORD_RESET_FAILURE, payload: err.response })
  }
}

export const resetPassword = newPassword => async dispatch => {
  dispatch({ type: RESET_PASSWORD })

  try {
    const response = await api.post('/reset_password', newPassword)
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: err.response })
  }
}
