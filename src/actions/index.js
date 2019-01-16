import api from '../api'
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_CONTACTS,
  FETCH_CONTACT,
  VERIFY,
  REGISTER,
  SWIPED,
  FETCH_ATTRIBUTES,
  FETCH_CONTACT_ATTRIBUTES,
  FETCH_TYPES,
  FETCH_PROFILE
} from './types'

import { attributes, contact, attributeTypes, user } from './mockData'

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

export const fetchAttributeTypes = () => {
  return {
    type: FETCH_TYPES,
    payload: attributeTypes
  }
}

export const fetchUserProfile = () => {
  return {
    type: FETCH_PROFILE,
    payload: user
  }
}

// export const fetch_my_attributes = async dispatch => {
//   const response = await api.get('/user/attributes')

//   dispatch({ type: FETCH_ATTRIBUTES, payload: response.data })
// }

export const fetchMyAttributes = () => {
  return {
    type: FETCH_ATTRIBUTES,
    payload: attributes
  }
}

export const fetchContact = () => {
  return {
    type: FETCH_CONTACT,
    payload: contact.profile
  }
}

export const fetchContactAttributes = () => {
  return {
    type: FETCH_CONTACT_ATTRIBUTES,
    payload: contact.attributes
  }
}
