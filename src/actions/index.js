import api from '../api'
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_CONTACTS,
  VERIFY,
  REGISTER,
  SWIPED
} from './types'

export const signIn = formValues => {
  return {
    type: SIGN_IN,
    payload: formValues
  }
}

export const register = formValues => async dispatch => {
  const response = await api.post('/register', formValues)

  dispatch({ type: REGISTER, payload: response.data })
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const verifyAttribute = (
  verification_token,
  { uuid }
) => async dispatch => {
  const response = await api.post('/verify_registration', {
    uuid,
    verification_token
  })

  dispatch({ type: VERIFY, payload: response.data })
  // Set auth header on axios instance
  api.defaults.headers.common['Authorization'] = response.data.auth_token
}

export const fetchContacts = () => async dispatch => {
  const response = await api.get('/users')

  dispatch({ type: FETCH_CONTACTS, payload: response.data })
}

export const swiped = idx => {
  return {
    type: SWIPED,
    payload: idx
  }
}
