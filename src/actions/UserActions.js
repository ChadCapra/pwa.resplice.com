import api from '../api'
import {
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_ATTRIBUTES,
  FETCH_ATTRIBUTES_SUCCESS,
  FETCH_ATTRIBUTES_FAILURE
} from './types'

export const fetchUserProfile = () => async dispatch => {
  dispatch({ type: FETCH_PROFILE })

  try {
    const response = await api.get('/user/profile')
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: err })
  }
}

export const fetchUserAttributes = () => async dispatch => {
  dispatch({ type: FETCH_ATTRIBUTES })

  try {
    const response = await api.get('/user/attributes')
    dispatch({ type: FETCH_ATTRIBUTES_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FETCH_ATTRIBUTES_FAILURE, payload: err })
  }
}
