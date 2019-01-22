import api from '../api'
import {
  ADD_ATTRIBUTE,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAILURE,
  EDIT_ATTRIBUTE,
  EDIT_ATTRIBUTE_SUCCESS,
  EDIT_ATTRIBUTE_FAILURE,
  DELETE_ATTRIBUTE,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_FAILURE,
  SHARE_ATTRIBUTES,
  SHARE_ATTRIBUTES_SUCCESS,
  SHARE_ATTRIBUTES_FAILURE
} from './types'

export const addAttribute = attribute => async dispatch => {
  dispatch({ type: ADD_ATTRIBUTE })

  try {
    const response = await api.post('/user/add_attribute', attribute)
    dispatch({ type: ADD_ATTRIBUTE_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: ADD_ATTRIBUTE_FAILURE, payload: err.response })
  }
}

export const editAttribute = attribute => async dispatch => {
  dispatch({ type: EDIT_ATTRIBUTE })

  try {
    const response = await api.post('/user/edit_attribute', attribute)
    dispatch({ type: EDIT_ATTRIBUTE_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: EDIT_ATTRIBUTE_FAILURE, payload: err.response })
  }
}

export const deleteAttribute = ({ id }) => async dispatch => {
  dispatch({ type: DELETE_ATTRIBUTE })

  try {
    await api.delete(`/user/attributes/${id}`)
    dispatch({ type: DELETE_ATTRIBUTE_SUCCESS })
  } catch (err) {
    dispatch({ type: DELETE_ATTRIBUTE_FAILURE, payload: err.response })
  }
}

export const shareAttributes = shares => async dispatch => {
  dispatch({ type: SHARE_ATTRIBUTES })

  try {
    await api.post('/sharing/share_attributes', shares)
    dispatch({ type: SHARE_ATTRIBUTES_SUCCESS })
  } catch (err) {
    dispatch({ type: SHARE_ATTRIBUTES_FAILURE, payload: err.response })
  }
}
