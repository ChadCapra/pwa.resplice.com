import api from '../api'
import {
  FETCH_ATTRIBUTE_TYPES,
  FETCH_ATTRIBUTE_TYPES_SUCCESS,
  FETCH_ATTRIBUTE_TYPES_FAILURE,
  ADD_ATTRIBUTE,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAILURE,
  EDIT_ATTRIBUTE,
  EDIT_ATTRIBUTE_SUCCESS,
  EDIT_ATTRIBUTE_FAILURE,
  DELETE_ATTRIBUTE,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_FAILURE,
  VERIFY_ATTRIBUTE,
  VERIFY_ATTRIBUTE_SUCCESS,
  VERIFY_ATTRIBUTE_FAILURE,
  RESEND_VERIFY_ATTRIBUTE,
  RESEND_VERIFY_ATTRIBUTE_SUCCESS,
  RESEND_VERIFY_ATTRIBUTE_FAILURE
} from './types'
import { objectArrToDict } from '../helpers'

export const fetchAttributeTypes = () => async dispatch => {
  dispatch({ type: FETCH_ATTRIBUTE_TYPES })

  try {
    const response = await api.get('/attribute/attribute_types')
    response.data.ok = objectArrToDict(response.data.ok, 'id')
    dispatch({ type: FETCH_ATTRIBUTE_TYPES_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FETCH_ATTRIBUTE_TYPES_FAILURE, payload: err })
  }
}

export const addAttribute = attribute => async dispatch => {
  dispatch({ type: ADD_ATTRIBUTE })

  try {
    const response = await api.post('/attribute/add', attribute)
    dispatch({ type: ADD_ATTRIBUTE_SUCCESS, payload: response.data })
  } catch (err) {
    console.log(err)
    dispatch({ type: ADD_ATTRIBUTE_FAILURE, payload: err })
  }
}

export const editAttribute = attribute => async dispatch => {
  dispatch({ type: EDIT_ATTRIBUTE })

  try {
    const response = await api.put(
      `/attribute/${attribute.uuid}/edit`,
      attribute
    )
    dispatch({ type: EDIT_ATTRIBUTE_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: EDIT_ATTRIBUTE_FAILURE, payload: err })
  }
}

export const deleteAttribute = uuid => async dispatch => {
  dispatch({ type: DELETE_ATTRIBUTE })

  try {
    await api.delete(`/user/attributes/${uuid}`)
    const payload = { data: { uuid } }
    dispatch({ type: DELETE_ATTRIBUTE_SUCCESS, payload })
  } catch (err) {
    dispatch({ type: DELETE_ATTRIBUTE_FAILURE, payload: err })
  }
}

export const verifyAttribute = (uuid, verify_token) => async dispatch => {
  dispatch({ type: VERIFY_ATTRIBUTE })

  try {
    const response = await api.post('/attribute/verify', { uuid, verify_token })
    dispatch({ type: VERIFY_ATTRIBUTE_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: VERIFY_ATTRIBUTE_FAILURE, payload: err })
  }
}

export const resendAttributeVerification = uuid => async dispatch => {
  dispatch({ type: RESEND_VERIFY_ATTRIBUTE })

  try {
    const response = await api.post('/attribute/resend', { uuid })
    dispatch({ type: RESEND_VERIFY_ATTRIBUTE_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: RESEND_VERIFY_ATTRIBUTE_FAILURE })
  }
}
