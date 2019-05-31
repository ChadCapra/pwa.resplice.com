import api from '../api'
import {
  AUTHORIZE,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE
} from './types'

export const fetchUserProfile = () => async dispatch => {
  dispatch({ type: FETCH_PROFILE })

  try {
    const response = await api.get('/user/profile')
    if (response.data.data.name) {
      dispatch({ type: AUTHORIZE })
    }
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data })
  } catch (err) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: err })
  }
}
