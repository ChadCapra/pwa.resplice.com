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
  DELETE_ATTRIBUTE_FAILURE
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
    const response = await api.post('/user/add_attribute', attribute)
    const {
      user: { collections }
    } = getState()
    collections[response.data.collection].push(response.data)
    dispatch({ type: ADD_ATTRIBUTE_SUCCESS, payload: collections })
  } catch (err) {
    dispatch({ type: ADD_ATTRIBUTE_FAILURE, payload: err.response })
  }
}

export const editAttribute = (attribute, prevAttribute) => async (
  dispatch,
  getState
) => {
  dispatch({ type: EDIT_ATTRIBUTE })

  // I eventually may want to keep an attribute array in state
  // and rebuild collections on create or edit
  // instead of editing the collections object
  try {
    const response = await api.post('/user/edit_attribute', attribute)
    const {
      user: { collections }
    } = getState()
    const attrIdx = collections[prevAttribute.collection].findIndex(
      attr => attr.id === prevAttribute.id
    )
    collections[prevAttribute.collection].splice(attrIdx, 1)
    collections[response.data.collection]
      ? collections[response.data.collection].push(response.data)
      : (collections[response.data.collection] = [response.data])
    dispatch({ type: EDIT_ATTRIBUTE_SUCCESS, payload: collections })
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
