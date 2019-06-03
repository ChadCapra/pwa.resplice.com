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

export const fetchAttributeTypes = () => async dispatch => {
  dispatch({ type: FETCH_ATTRIBUTE_TYPES })

  try {
    const response = await api.get('/attribute/types')
    dispatch({ type: FETCH_ATTRIBUTE_TYPES_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FETCH_ATTRIBUTE_TYPES_FAILURE, payload: err })
  }
}

export const addAttribute = attribute => async (dispatch, getState) => {
  dispatch({ type: ADD_ATTRIBUTE })

  try {
    const {
      userState: {
        attributes: [...attributes]
      }
    } = getState()

    const response = await api.post('/attribute/add', attribute)
    const addedAttribute = response.data.data
    attributes.push(addedAttribute)

    dispatch({ type: ADD_ATTRIBUTE_SUCCESS, payload: attributes })
  } catch (err) {
    dispatch({ type: ADD_ATTRIBUTE_FAILURE, payload: err })
  }
}

export const editAttribute = attribute => async (dispatch, getState) => {
  dispatch({ type: EDIT_ATTRIBUTE })

  try {
    const {
      userState: {
        attributes: [...attributes]
      }
    } = getState()

    const response = await api.post('/attribute/edit', attribute)
    const editedAttribute = response.data.data
    const attrIdx = attributes.findIndex(
      attr => attr.uuid === editedAttribute.uuid
    )
    attributes[attrIdx] = editedAttribute

    dispatch({ type: EDIT_ATTRIBUTE_SUCCESS, payload: attributes })
  } catch (err) {
    console.log(err)
    dispatch({ type: EDIT_ATTRIBUTE_FAILURE, payload: err })
  }
}

export const deleteAttribute = ({ uuid }) => async dispatch => {
  dispatch({ type: DELETE_ATTRIBUTE })

  try {
    await api.delete(`/user/attributes/${uuid}`)
    dispatch({ type: DELETE_ATTRIBUTE_SUCCESS })
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
