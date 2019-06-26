import api from '../api'
import {
  FETCH_GROUP_LIST,
  FETCH_GROUP_LIST_SUCCESS,
  FETCH_GROUP_LIST_FAILURE,
  FETCH_GROUP,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_FAILURE,
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE
} from './types'
import { contact } from './mockData'

export const fetchGroupList = () => async dispatch => {
  dispatch({ type: FETCH_GROUP_LIST })

  try {
    const response = await api.get('/groups')
    dispatch({ type: FETCH_GROUP_LIST_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FETCH_GROUP_LIST_FAILURE, payload: err.response })
  }
}

export const fetchGroup = ({ id }) => async dispatch => {
  dispatch({ type: FETCH_GROUP })

  try {
    // const response = await api.get(`/groups/${id}`)
    // dispatch({ type: FETCH_GROUP_SUCCESS, payload: response.data })
    dispatch({ type: FETCH_GROUP_SUCCESS, payload: contact })
  } catch (err) {
    dispatch({ type: FETCH_GROUP_FAILURE, payload: err.response })
  }
}

export const createGroup = group => async dispatch => {
  dispatch({ type: CREATE_GROUP })

  try {
    console.log(group)
    const response = await api.get('/groups/create', group)
    dispatch({ type: CREATE_GROUP_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: CREATE_GROUP_FAILURE, payload: err })
  }
}
