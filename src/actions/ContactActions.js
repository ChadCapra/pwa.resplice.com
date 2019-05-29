import api from '../api'
import {
  FETCH_CONTACT_LIST,
  FETCH_CONTACT_LIST_SUCCESS,
  FETCH_CONTACT_LIST_FAILURE,
  FETCH_CONTACT,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_FAILURE
} from './types'

export const fetchContactList = () => async dispatch => {
  dispatch({ type: FETCH_CONTACT_LIST })

  try {
    const response = await api.get('/user/contacts')
    dispatch({ type: FETCH_CONTACT_LIST_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FETCH_CONTACT_LIST_FAILURE, payload: err.response })
  }
}

export const fetchContact = ({ uuid }) => async dispatch => {
  dispatch({ type: FETCH_CONTACT })

  try {
    const response = await api.get(`/user/contacts/${uuid}`)
    dispatch({ type: FETCH_CONTACT_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FETCH_CONTACT_FAILURE, payload: err.response })
  }
}
